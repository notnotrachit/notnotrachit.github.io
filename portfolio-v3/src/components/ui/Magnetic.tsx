import { motion } from "framer-motion";
import { type MouseEvent, type ReactElement, useRef, useState } from "react";

interface MagneticProps {
	children: ReactElement;
	strength?: number; // 0.1 to 1 usually
}

export function Magnetic({ children, strength = 0.35 }: MagneticProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMouse = (e: MouseEvent) => {
		const { clientX, clientY } = e;
		const rect = ref.current?.getBoundingClientRect();

		if (rect) {
			const { height, width, left, top } = rect;
			const middleX = clientX - (left + width / 2);
			const middleY = clientY - (top + height / 2);
			setPosition({ x: middleX * strength, y: middleY * strength });
		}
	};

	const reset = () => {
		setPosition({ x: 0, y: 0 });
	};

	const { x, y } = position;

	return (
		<motion.div
			ref={ref}
			onMouseMove={handleMouse}
			onMouseLeave={reset}
			animate={{ x, y }}
			transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
			style={{ display: "inline-block" }}
		>
			{children}
		</motion.div>
	);
}
