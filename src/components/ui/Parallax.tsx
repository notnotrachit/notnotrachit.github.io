"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxProps {
	children: ReactNode;
	offset?: number;
	className?: string;
	direction?: "up" | "down";
}

export function Parallax({ 
	children, 
	offset = 50, 
	className = "", 
	direction = "up" 
}: ParallaxProps) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	// Determine direction: "up" means element moves against scroll (translates negative Y)
	// "down" means element moves with scroll (translates positive Y)
	const range = direction === "up" ? [offset, -offset] : [-offset, offset];
	
	const y = useTransform(scrollYProgress, [0, 1], range);
	const smoothY = useSpring(y, { damping: 15, stiffness: 100 });

	return (
		<motion.div ref={ref} style={{ y: smoothY }} className={className}>
			{children}
		</motion.div>
	);
}
