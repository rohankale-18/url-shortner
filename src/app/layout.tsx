import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"

const mono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Short URL",
    description: "Generate quick and short URLs without registration",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${mono.variable} ${mono.className} antialiased`}>
                <Toaster
                    position="top-center"
                    style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                    }}
                />
                {children}
                <Analytics />
            </body>
        </html>
    );
}
