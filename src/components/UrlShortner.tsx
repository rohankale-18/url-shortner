"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const UrlShortner = () => {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const isValidUrl = (url: string) => {
        try {
            const parsed = new URL(url);
            if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
                return false;
            }
            if (
                parsed.hostname === "localhost" ||
                parsed.hostname.includes(".")
            ) {
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim()) {
            toast.error(
                "Please enter a URL. You need to provide a URL to shorten."
            );
            return;
        }

        if (!isValidUrl(url)) {
            toast.error(
                "Invalid URL. Please enter a valid URL (including http:// or https://)"
            );
            return;
        }

        setLoading(true);
        setShortUrl(null);

        try {
            const res = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to shorten URL");
            }

            const data = await res.json();
            setShortUrl(data.shortUrl);
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        if (shortUrl) {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // reset after 2s
        }
    };

    const handleReset = () => {
        setUrl("");
        setShortUrl("");
        setCopied(false);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Input
                        type="url"
                        placeholder="Enter your long URL here..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="h-12 text-base transition-smooth focus:ring-2 focus:ring-primary/20"
                    />
                    <Button
                        disabled={loading}
                        className="w-full h-12 hover:opacity-90 transition-smooth dark:text-black text-white font-medium"
                    >
                        {loading ? "Generating URL..." : "Generate URL"}
                    </Button>
                </div>
            </form>

            {shortUrl && (
                <Card className="bg-muted/50 border-dashed border-2 border-primary/20">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-muted-foreground mb-1">
                                    Shortened URL:
                                </p>
                                <p className="font-mono text-primary font-medium truncate">
                                    {shortUrl}
                                </p>
                            </div>
                            <Button
                                onClick={handleCopy}
                                variant="outline"
                                size="sm"
                                className="shrink-0 transition-smooth"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </Button>
                        </div>

                        <Button
                            onClick={handleReset}
                            variant="outline"
                            size="sm"
                            className="w-full mt-3"
                        >
                            Generate another URL
                        </Button>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default UrlShortner;
