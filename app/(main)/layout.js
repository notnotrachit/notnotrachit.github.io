import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata = {
    title: "Rachit Khurana | Full Stack Dev",
    description: "Building digital experiences. Minimalist & Modern.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth dark">
            <body
                className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground min-h-screen relative overflow-x-hidden`}
            >
                <div className="fixed inset-0 z-[-1] bg-background bg-grid-small [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none" />
                {children}
            </body>
        </html>
    );
}
