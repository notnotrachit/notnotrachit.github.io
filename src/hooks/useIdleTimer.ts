import { useEffect, useRef, useState } from "react";

export function useIdleTimer(timeoutMs = 30000) {
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
			"pointerdown",
			"keypress",
			"DOMMouseScroll",
			"mousewheel",
			"touchstart",
			"touchmove",
			"MSPointerMove",
			"scroll", // Added scroll
		];

		for (const event of events) {
			window.addEventListener(event, resetTimer);
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
			for (const event of events) {
				window.removeEventListener(event, resetTimer);
			}
		};
	}, [timeoutMs]);

	return isIdle;
}
