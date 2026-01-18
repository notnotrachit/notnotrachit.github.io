import { useCallback } from "react";
import gsap from "gsap";

export function useGravity() {
    const triggerGravity = useCallback(() => {
        const elements = document.querySelectorAll(
            "h1, h2, h3, p, span, a, button, img, div.group, div.relative.rounded-2xl, section > div",
        );

        elements.forEach((el) => {
            const element = el as HTMLElement;
            const rect = element.getBoundingClientRect();

            if (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            ) {
                const distanceToBottom = window.innerHeight - rect.bottom;

                // Animate down
                gsap.to(element, {
                    y: distanceToBottom,
                    rotation: Math.random() * 90 - 45,
                    duration: 1.5,
                    ease: "bounce.out",
                    delay: Math.random() * 0.5,
                });

                // Reset after 5 seconds
                gsap.to(element, {
                    y: 0,
                    rotation: 0,
                    duration: 1,
                    ease: "power2.out",
                    delay: 5,
                    clearProps: "all" // Important: removes inline styles so React/CSS takes over
                });
            }
        });
    }, []);

    const resetGravity = useCallback(() => {
        const elements = document.querySelectorAll(
            "h1, h2, h3, p, span, a, button, img, div.group, div.relative.rounded-2xl, section > div",
        );

        elements.forEach((el) => {
            const element = el as HTMLElement;
            gsap.to(element, {
                y: 0,
                rotation: 0,
                duration: 0.5,
                ease: "power2.out",
                clearProps: "all",
            });
        });
    }, []);

    return { triggerGravity, resetGravity };
}
