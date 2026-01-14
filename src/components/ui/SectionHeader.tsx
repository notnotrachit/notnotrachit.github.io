"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
	number: string;
	label: string;
	title?: string;
	description?: string;
	align?: "left" | "center";
}

export function SectionHeader({
	number,
	label,
	title,
	description,
	align = "left",
}: SectionHeaderProps) {
	const headerVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
			},
		},
	};

	const isCenter = align === "center";

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
			variants={headerVariants}
			className={`mb-16 ${isCenter ? "text-center" : ""}`}
		>
			{/* Numbered Label */}
			<div
				className={`flex items-center gap-4 mb-6 ${isCenter ? "justify-center" : ""}`}
			>
				<div className="flex items-center gap-2 text-cyan-500 font-mono text-sm tracking-widest bg-cyan-500/10 px-4 py-1.5 border border-cyan-500/20">
					<span className="text-cyan-500 font-bold">{number}</span>
					<span className="text-cyan-500/80">{label}</span>
				</div>
				{!isCenter && (
					<div className="h-px flex-grow bg-gradient-to-r from-cyan-500/30 to-transparent max-w-[200px]" />
				)}
			</div>

			{/* Title */}
			{title && (
				<h2
					className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-4 ${isCenter ? "mx-auto" : ""}`}
				>
					{title}
				</h2>
			)}

			{/* Description */}
			{description && (
				<p
					className={`font-body text-muted-foreground text-lg leading-relaxed ${isCenter ? "max-w-2xl mx-auto" : "max-w-xl"}`}
				>
					{description}
				</p>
			)}
		</motion.div>
	);
}
