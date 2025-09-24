import { getAndIncrement } from "@/db/queries";
import { Redis } from "@upstash/redis";
import { Hono } from "hono";

const redirect = new Hono();
const redis = Redis.fromEnv();

redirect.get("/:code", async (c) => {
    const code = c.req.param("code");

    const cachedUrl = await redis.get<string>(`short:${code}`);
    if (cachedUrl) {
        return c.redirect(cachedUrl, 302);
    }

    const longUrl = await getAndIncrement(code);

    if (!longUrl) return c.json({ error: "Not found" }, 404);

    return c.redirect(longUrl, 302);
});

export default redirect;
