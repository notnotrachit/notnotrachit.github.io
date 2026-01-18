"use client";

import { useEffect, useRef, useState } from "react";


interface DVDScreensaverProps {
    isActive: boolean;
}

export function DVDScreensaver({ isActive }: DVDScreensaverProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [velocity, setVelocity] = useState({ x: 2, y: 2 });
    const [color, setColor] = useState("#06b6d4"); // Initial cyan

    const colors = [
        "#ef4444", // red
        "#f97316", // orange
        "#eab308", // yellow
        "#22c55e", // green
        "#06b6d4", // cyan
        "#3b82f6", // blue
        "#a855f7", // purple
        "#ec4899", // pink
    ];

    // Reset position when activating
    useEffect(() => {
        if (isActive) {
            setPosition({
                x: Math.random() * (window.innerWidth - 200),
                y: Math.random() * (window.innerHeight - 100),
            });
            setVelocity({
                x: 2 * (Math.random() > 0.5 ? 1 : -1),
                y: 2 * (Math.random() > 0.5 ? 1 : -1),
            });
        }
    }, [isActive]);

    const animate = () => {
        if (!isActive) return;

        setPosition((prevPos) => {
            const logoWidth = 200; // Approx
            const logoHeight = 80; // Approx
            const maxX = window.innerWidth - logoWidth;
            const maxY = window.innerHeight - logoHeight;

            let newX = prevPos.x + velocity.x;
            let newY = prevPos.y + velocity.y;
            let newVelX = velocity.x;
            let newVelY = velocity.y;
            let hit = false;

            // Check collisions
            if (newX <= 0) {
                newX = 0;
                newVelX = Math.abs(velocity.x);
                hit = true;
            } else if (newX >= maxX) {
                newX = maxX;
                newVelX = -Math.abs(velocity.x);
                hit = true;
            }

            if (newY <= 0) {
                newY = 0;
                newVelY = Math.abs(velocity.y);
                hit = true;
            } else if (newY >= maxY) {
                newY = maxY;
                newVelY = -Math.abs(velocity.y);
                hit = true;
            }

            if (hit) {
                setColor(colors[Math.floor(Math.random() * colors.length)]);
                setVelocity({ x: newVelX, y: newVelY });
            }

            return { x: newX, y: newY };
        });

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isActive) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isActive, velocity]); // Dep on velocity to update loop closure

    if (!isActive) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-black cursor-none overflow-hidden"
            style={{ touchAction: "none" }}
        >
            <div
                className="absolute flex items-center justify-center p-4 rounded-xl border-2 backdrop-blur-md transition-colors duration-300"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    width: "200px",
                    height: "80px",
                    borderColor: color,
                    color: color,
                    boxShadow: `0 0 20px ${color}40`,
                }}
            >
                <span className="font-display font-bold text-2xl tracking-widest">
                    RACHIT
                </span>
            </div>

            <div className="absolute bottom-10 left-0 w-full text-center text-white/20 font-mono text-sm animate-pulse">
                Move mouse to wake up
            </div>
        </div>
    );
}
