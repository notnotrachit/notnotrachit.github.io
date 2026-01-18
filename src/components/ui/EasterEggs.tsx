"use client";

import { useState, useEffect, useCallback } from "react";
import { useKonamiCode } from "../../hooks/useKonamiCode";
import { MatrixRain } from "./MatrixRain";
import { Confetti } from "./Confetti";
import { DVDScreensaver } from "./DVDScreensaver";
import { CLITerminal } from "./CLITerminal";
import { useIdleTimer } from "../../hooks/useIdleTimer";

// ASCII Art for console
const CONSOLE_ART = `
%c
██████╗  █████╗  ██████╗██╗  ██╗██╗████████╗
██╔══██╗██╔══██╗██╔════╝██║  ██║██║╚══██╔══╝
██████╔╝███████║██║     ███████║██║   ██║   
██╔══██╗██╔══██║██║     ██╔══██║██║   ██║   
██║  ██║██║  ██║╚██████╗██║  ██║██║   ██║   
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝   ╚═╝   
                                            
%c👋 Hey there, fellow developer!

Looking at the code? Nice!

Just for your info, there are some hidden easter eggs on my website. Try to find them! 😉

Built with ❤️ using React, TanStack, and way too much coffee ☕

Want to work together? → notnotrachit@gmail.com
`;

export function EasterEggs() {
    const [showMatrix, setShowMatrix] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [typedSequence, setTypedSequence] = useState("");
    const isIdle = useIdleTimer(30000); // 30 seconds

    // Konami Code Easter Egg
    useKonamiCode(
        useCallback(() => {
            if (document.documentElement.classList.contains('hacker-mode')) {
                document.documentElement.classList.remove('hacker-mode');
            } else {
                setShowMatrix(true);
            }
        }, []),
    );

    // Console message on mount
    useEffect(() => {
        console.log(
            CONSOLE_ART,
            "color: #06b6d4; font-family: monospace; font-size: 10px;",
            "color: #94a3b8; font-family: system-ui;",
        );
    }, []);

    // "hire me" typing easter egg
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Ignore if typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            const newSequence = (typedSequence + e.key).toLowerCase().slice(-4);
            setTypedSequence(newSequence);

            if (newSequence === "hire") {
                setShowConfetti(true);
                // Open email
                setTimeout(() => {
                    window.location.href = "mailto:notnotrachit@gmail.com?subject=Let's work together!";
                }, 1500);
            }
        };

        window.addEventListener("keypress", handleKeyPress);
        return () => window.removeEventListener("keypress", handleKeyPress);
    }, [typedSequence]);

    const toggleHackerMode = () => {
        document.documentElement.classList.add('hacker-mode');
        // Optional: Remove after some time or keep it
    };

    return (
        <>
            <MatrixRain
                isActive={showMatrix}
                onComplete={() => {
                    setShowMatrix(false);
                    toggleHackerMode();
                }}
                duration={8000}
            />
            <Confetti
                isActive={showConfetti}
                onComplete={() => setShowConfetti(false)}
            />
            <DVDScreensaver isActive={isIdle} />
            <CLITerminal />
        </>
    );
}

// Export trigger functions for other components
export function useEasterEggTriggers() {
    const [showConfetti, setShowConfetti] = useState(false);

    const triggerConfetti = useCallback(() => {
        setShowConfetti(true);
    }, []);

    const hideConfetti = useCallback(() => {
        setShowConfetti(false);
    }, []);

    return { showConfetti, triggerConfetti, hideConfetti };
}
