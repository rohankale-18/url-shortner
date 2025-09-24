// import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import UrlShortner from "@/components/UrlShortner";
import Stats from "@/components/Stats";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100/50 dark:bg-neutral-900 p-6">
            <div className="w-full max-w-2xl mx-auto space-y-6">
                <ThemeToggle />
                <Card className="shadow-elegant border-border/50 bg-gray-50 dark:bg-neutral-800/80">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-2">
                            <Link className="w-6 h-6 text-black dark:text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-black dark:text-white">
                            URL Shortener
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Transform your long URLs into short, shareable links
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <UrlShortner />
                    </CardContent>
                </Card>

                <div className="text-center text-sm text-muted-foreground space-y-10">
                    <p>
                        No registration required • Free to use • Privacy focused
                    </p>
                    <Stats />
                </div>
            </div>
        </main>
    );
}
