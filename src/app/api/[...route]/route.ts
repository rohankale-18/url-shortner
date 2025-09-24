import { Context, Hono, Next } from "hono";
import shorten from "./routes/shorten";
import redirect from "./routes/redirect";
import stats from "./routes/stats";
export const dynamic = "force-dynamic";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const app = new Hono().basePath("/api");

// Redis instance
const redis = Redis.fromEnv();

// Rate limiter: 10 requests / 10 seconds
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

// Hono middleware for rate limiting
const rateLimitMiddleware = async (c: Context, next: Next) => {
  const ip =
    c.req.header("x-forwarded-for") ||
    c.req.header("cf-connecting-ip") ||
    c.req.raw.headers.get("x-real-ip") ||
    "unknown";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return c.json({ error: "Too many requests" }, 429);
  }

  await next();
};

// Apply rate limit **only** to shorten route
app.use("/shorten/*", rateLimitMiddleware); // attach middleware to all /shorten routes
app.route("/shorten", shorten);  

// Other routes, no rate limiting
app.route("/:code", redirect);
app.route("/stats", stats);

export const GET = app.fetch;
export const POST = app.fetch;
