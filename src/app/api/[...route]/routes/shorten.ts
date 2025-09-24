import { createShortUrl } from "@/db/queries";
import { Redis } from "@upstash/redis";
import { Hono } from "hono";

const shorten = new Hono();
const redis = Redis.fromEnv();

shorten.post("/", async (c) => {
    const { url } = await c.req.json<{ url: string }>();

    if (!url) return c.json({ error: "URL required" }, 400);

    const newUrl = await createShortUrl(url);

    await redis.setex(`short:${newUrl}`, 60 * 60, url);

    return c.json({
        shortUrl: `${new URL(c.req.url).origin}/${newUrl.code}`,
    });
});

export default shorten;
