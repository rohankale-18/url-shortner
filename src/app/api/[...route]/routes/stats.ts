import { Hono } from "hono";
import { getUrlCount } from "@/db/queries";

const stats = new Hono();

stats.get("/", (c) => {
    let interval: ReturnType<typeof setInterval>; // ✅ Type-safe

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();

            const sendCount = async () => {
                const total = await getUrlCount();
                controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ total })}\n\n`)
                );
            };

            // Send initial count immediately
            await sendCount();

            // Start interval for updates
            interval = setInterval(sendCount, 5000);
        },

        cancel() {
            clearInterval(interval); // ✅ Works now
        },
    });

    return c.body(stream, 200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });
});

export default stats;
