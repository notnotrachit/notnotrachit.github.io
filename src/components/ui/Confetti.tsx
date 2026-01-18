"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
    id: number;
    x: number;
    color: string;
    rotation: number;
    size: number;
}

interface ConfettiProps {
    isActive: boolean;
    onComplete?: () => void;
    duration?: number;
    count?: number;
}

const COLORS = ["#06b6d4", "#22d3ee", "#67e8f9", "#a5f3fc", "#fbbf24", "#f472b6", "#a78bfa", "#4ade80"];

export function Confetti({ isActive, onComplete, duration = 3000, count = 50 }: ConfettiProps) {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

    useEffect(() => {
        if (!isActive) {
            setPieces([]);
            return;
        }

        const newPieces: ConfettiPiece[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            rotation: Math.random() * 360,
            size: Math.random() * 8 + 4,
        }));

        setPieces(newPieces);

        const timeout = setTimeout(() => {
            onComplete?.();
        }, duration);

        return () => clearTimeout(timeout);
    }, [isActive, count, duration, onComplete]);

    return (
        <AnimatePresence>
            {isActive && (
                <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
                    {pieces.map((piece) => (
                        <motion.div
                            key={piece.id}
                            initial={{
                                x: `${piece.x}vw`,
                                y: "-10vh",
                                rotate: 0,
                                opacity: 1,
                            }}
                            animate={{
                                y: "110vh",
                                rotate: piece.rotation + 720,
                                opacity: [1, 1, 0],
                            }}
                            transition={{
                                duration: duration / 1000,
                                ease: "easeIn",
                                delay: Math.random() * 0.5,
                            }}
                            style={{
                                position: "absolute",
                                width: piece.size,
                                height: piece.size,
                                backgroundColor: piece.color,
                                borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                            }}
                        />
                    ))}
                </div>
            )}
        </AnimatePresence>
    );
}
