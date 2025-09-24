import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
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
                <Script type="text/javascript">
                    {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "tfrtz2ox02");
          `}
                </Script>
                <Analytics />
            </body>
        </html>
    );
}
