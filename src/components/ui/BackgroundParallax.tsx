"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function BackgroundParallax() {
	const { scrollYProgress } = useScroll();

	// Unified direction: all layers move 'up' (against scroll) or 'down' (with scroll) relative to content
	// Here they translate upwards (negative Y) as user scrolls down, but at varying speeds to create depth.
	// Faster speed = closer to viewer. Slower speed = far background.

	const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]); // Distant grid/bg
	const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]); // Midground elements
	const y3 = useTransform(scrollYProgress, [0, 1], [0, -800]); // Foreground elements

	const smoothY1 = useSpring(y1, { damping: 20, stiffness: 50 });
	const smoothY2 = useSpring(y2, { damping: 20, stiffness: 50 });
	const smoothY3 = useSpring(y3, { damping: 20, stiffness: 50 });

	return (
		<div className="fixed inset-0 w-full max-w-full h-full pointer-events-none z-0 overflow-hidden select-none">
			{/* Base Grid Layer - Moves very slowly */}
			<motion.div
				style={{ y: smoothY1 }}
				className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform"
			>
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
			</motion.div>

			{/* Abstract Code Blocks - Midground */}
			{/* Top Right Code Snippet */}
			<motion.div
				style={{ y: smoothY2, right: '2%', top: '15%' }}
				className="absolute p-4 rounded-xl border border-cyan-500/10 bg-cyan-950/5 w-64 max-w-[calc(100%-2rem)] will-change-transform"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 1 }}
			>
				<div className="flex flex-col gap-2">
					<div className="h-2 w-24 bg-cyan-500/20 rounded-full mb-2" />
					<div className="h-2 w-full bg-cyan-500/10 rounded-full" />
					<div className="h-2 w-[80%] bg-cyan-500/10 rounded-full" />
					<div className="h-2 w-[90%] bg-cyan-500/10 rounded-full" />
				</div>
			</motion.div>

			{/* Left Side Wireframe Card */}
			<motion.div
				style={{ y: smoothY2, x: '10%', top: '40%' }}
				className="absolute p-4 rounded-xl border border-white/5 bg-white/5 w-56 h-40 will-change-transform"
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.6 }}
				transition={{ delay: 0.7, duration: 1 }}
			>
				<div className="flex gap-2 mb-4">
					<div className="w-3 h-3 rounded-full bg-red-500/20" />
					<div className="w-3 h-3 rounded-full bg-yellow-500/20" />
					<div className="w-3 h-3 rounded-full bg-green-500/20" />
				</div>
				<div className="grid grid-cols-2 gap-2">
					<div className="h-16 rounded bg-white/5" />
					<div className="h-16 rounded bg-white/5" />
				</div>
			</motion.div>

			{/* Floating Syntax Elements - Foreground/Midground Mix */}
			<motion.div
				style={{ y: smoothY3, right: '5%', top: '60%' }}
				className="absolute font-mono text-cyan-500/10 text-9xl font-bold tracking-tighter will-change-transform"
			>
				{`{ }`}
			</motion.div>

			<motion.div
				style={{ y: smoothY3, left: '5%', top: '75%' }}
				className="absolute font-mono text-blue-500/10 text-[10rem] font-bold will-change-transform"
			>
				&lt;/&gt;
			</motion.div>

			{/* Bottom Right UI Element */}
			<motion.div
				style={{ y: smoothY2, right: '15%', top: '85%' }}
				className="absolute p-3 rounded-lg border border-purple-500/10 bg-purple-900/5 w-48 will-change-transform"
			>
				<div className="flex items-center gap-3 mb-2">
					<div className="w-8 h-8 rounded-full bg-purple-500/20" />
					<div className="flex flex-col gap-1">
						<div className="h-1.5 w-16 bg-purple-500/20 rounded-full" />
						<div className="h-1.5 w-10 bg-purple-500/10 rounded-full" />
					</div>
				</div>
				<div className="h-1.5 w-full bg-purple-500/10 rounded-full mt-2" />
			</motion.div>

		</div>
	);
}
