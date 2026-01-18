"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MatrixRainProps {
    isActive: boolean;
    onComplete?: () => void;
    duration?: number;
}

const HACKER_MESSAGES = [
    "Initializing handshake...",
    "Bypassing mainframe firewall...",
    "Decrypting portfolio data...",
    "Accessing secure nodes...",
    "Downloading skills.zip...",
    "Injecting coffee...",
    "ACCESS GRANTED"
];

export function MatrixRain({ isActive, onComplete, duration = 8000 }: MatrixRainProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentMessage, setCurrentMessage] = useState(0);

    // Cycle through hacker messages
    useEffect(() => {
        if (!isActive) {
            setCurrentMessage(0);
            return;
        }

        const interval = setInterval(() => {
            setCurrentMessage(prev => {
                if (prev >= HACKER_MESSAGES.length - 1) return prev;
                return prev + 1;
            });
        }, duration / HACKER_MESSAGES.length);

        return () => clearInterval(interval);
    }, [isActive, duration]);

    useEffect(() => {
        if (!isActive || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const charArray = chars.split("");
        const fontSize = 16;
        const columns = Math.ceil(canvas.width / fontSize);
        const drops: number[] = Array(columns).fill(0).map(() => Math.random() * -100);
        const speeds: number[] = Array(columns).fill(0).map(() => Math.random() * 0.5 + 0.5);

        const draw = () => {
            // Semi-transparent black for trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `bold ${fontSize}px monospace`;
            ctx.textAlign = "center";

            for (let i = 0; i < drops.length; i++) {
                const char = charArray[Math.floor(Math.random() * charArray.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Randomly glitched character color
                const isGlitch = Math.random() > 0.98;

                if (isGlitch) {
                    ctx.fillStyle = "#fff";
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = "#fff";
                } else {
                    // Gradient-like effect based on position or random
                    ctx.fillStyle = "#0ff";
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = "#0ff";
                }

                ctx.fillText(char, x, y);

                // Reset drop if it goes off screen (randomized to look more natural)
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = Math.random() * -50;
                    speeds[i] = Math.random() * 0.5 + 0.5;
                }

                drops[i] += speeds[i];

                // Reset shadow for next iteration
                ctx.shadowBlur = 0;
            }
        };

        const interval = setInterval(draw, 33);

        const timeout = setTimeout(() => {
            onComplete?.();
        }, duration);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            window.removeEventListener("resize", handleResize);
        };
    }, [isActive, onComplete, duration]);

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] bg-black font-mono overflow-hidden"
                >
                    <canvas ref={canvasRef} className="w-full h-full block" />

                    {/* CRT Scanline Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] z-10" />
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] z-20" />

                    {/* Center Terminal */}
                    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-black/80 border border-cyan-500/50 p-8 md:p-12 rounded-lg max-w-lg w-full shadow-[0_0_50px_rgba(6,182,212,0.3)] backdrop-blur-md relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

                            <div className="flex flex-col gap-4">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wider flex items-center gap-3">
                                    <span className="animate-pulse text-cyan-500">➜</span>
                                    SYSTEM OVERRIDE
                                </h2>

                                <div className="space-y-2 font-mono text-sm md:text-base">
                                    {HACKER_MESSAGES.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`transition-all duration-300 ${idx === currentMessage
                                                    ? "text-cyan-400 opacity-100 scale-105 origin-left font-bold"
                                                    : idx < currentMessage
                                                        ? "text-cyan-500/50 opacity-50"
                                                        : "opacity-0 h-0 overflow-hidden"
                                                }`}
                                        >
                                            {idx < currentMessage ? "✓" : ">"} {msg}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
