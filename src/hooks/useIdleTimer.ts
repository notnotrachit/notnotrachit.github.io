import { useState, useEffect, useRef } from "react";

export function useIdleTimer(timeoutMs: number = 30000) {
    const [isIdle, setIsIdle] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const resetTimer = () => {
            setIsIdle(false);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                setIsIdle(true);
            }, timeoutMs);
        };

        // Initial start
        resetTimer();

        // Events to listen for
        const events = [
            "mousemove",
            "mousedown",
            "keypress",
            "DOMMouseScroll",
            "mousewheel",
            "touchmove",
            "MSPointerMove",
            "scroll" // Added scroll
        ];

        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [timeoutMs]);

    return isIdle;
}
