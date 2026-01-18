import { useEffect, useState, useCallback } from "react";

const KONAMI_CODE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
];

export function useKonamiCode(callback: () => void) {
    const [index, setIndex] = useState(0);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const key = event.code;
            const expectedKey = KONAMI_CODE[index];

            if (key === expectedKey) {
                if (index === KONAMI_CODE.length - 1) {
                    callback();
                    setIndex(0);
                } else {
                    setIndex((prev) => prev + 1);
                }
            } else {
                setIndex(0);
            }
        },
        [index, callback],
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return index > 0 ? index / KONAMI_CODE.length : 0;
}
