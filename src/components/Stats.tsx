"use client";
import { useEffect, useState } from "react";

const Stats = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const eventSource = new EventSource("/api/stats");
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setCount(data.total);
        };
        return () => {
            eventSource.close();
        };
    }, []);
    return (
        <span className="text-xl text-black/80 dark:text-white/60">
            URLs Generated:{" "}
            <span className="text-black dark:text-white">{count}</span>
        </span>
    );
};

export default Stats;
