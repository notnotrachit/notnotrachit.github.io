import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
	const [isHovered, setIsHovered] = useState(false);
	const [isActive, setIsActive] = useState(false);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	// Smooth spring animation for the main cursor (fast)
	const cursorX = useSpring(mouseX, { damping: 30, stiffness: 1000 });
	const cursorY = useSpring(mouseY, { damping: 30, stiffness: 1000 });

	// Smoother, slower spring for the trailing ring
	const ringX = useSpring(mouseX, { damping: 20, stiffness: 300 });
	const ringY = useSpring(mouseY, { damping: 20, stiffness: 300 });

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};

		const handleMouseDown = () => setIsActive(true);
		const handleMouseUp = () => setIsActive(false);

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				target.tagName === "A" ||
				target.tagName === "BUTTON" ||
				target.closest("a") ||
				target.closest("button") ||
				target.classList.contains("interactive") ||
				window.getComputedStyle(target).cursor === "pointer"
			) {
				setIsHovered(true);
			} else {
				setIsHovered(false);
			}
		};

		window.addEventListener("mousemove", moveCursor);
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("mouseover", handleMouseOver);

		return () => {
			window.removeEventListener("mousemove", moveCursor);
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("mouseover", handleMouseOver);
		};
	}, [mouseX, mouseY]);

	return (
		<>
			{/* Trailing Ring */}
			<motion.div
				className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-50 mix-blend-difference"
				style={{
					x: ringX,
					y: ringY,
					translateX: "-50%",
					translateY: "-50%",
				}}
				animate={{
					scale: isActive ? 0.8 : isHovered ? 1.5 : 1,
					borderWidth: isHovered ? "2px" : "1px",
					borderColor: isHovered
						? "rgba(255, 255, 255, 0.8)"
						: "rgba(255, 255, 255, 0.3)",
				}}
				transition={{ duration: 0.2 }}
			/>

			{/* Center Dot */}
			<motion.div
				className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
				style={{
					x: cursorX,
					y: cursorY,
					translateX: "-50%",
					translateY: "-50%",
				}}
				animate={{
					scale: isActive ? 0.5 : isHovered ? 0 : 1, // Hide dot when hovering interactive elements (ring takes over)
				}}
				transition={{ duration: 0.15 }}
			/>
		</>
	);
}
