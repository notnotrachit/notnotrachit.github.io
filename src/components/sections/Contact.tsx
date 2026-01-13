"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { SectionHeader } from "../ui/SectionHeader";

export function Contact() {
	const titleVariants = {
		hidden: { yPercent: 100, opacity: 0 },
		visible: {
			yPercent: 0,
			opacity: 1,
			transition: {
				duration: 1.2,
				ease: [0.16, 1, 0.3, 1],
			},
		},
	};

	return (
		<section
			id="contact"
			className="relative w-full min-h-[90vh] flex flex-col justify-between py-24 md:py-32 bg-transparent overflow-hidden"
		>
			{/* Background Glow */}
			<div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 blur-[120px] -z-10 pointer-events-none" />

			<div className="container mx-auto px-6 md:px-12 max-w-7xl flex-1 flex flex-col justify-center items-center text-center z-10">
				<SectionHeader
					number="07."
					label="GET IN TOUCH"
					align="center"
				/>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.05] mb-12"
				>
					<span className="w-2 h-2 bg-cyan-500 animate-pulse" />
					<p className="font-body text-neutral-400 text-sm tracking-wide uppercase">
						Open for opportunities
					</p>
				</motion.div>

				<div className="overflow-hidden mb-16 relative">
					<motion.h2
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						variants={titleVariants}
						className="font-display text-[clamp(4rem,14vw,12rem)] leading-[0.8] font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
					>
						Let's Work
						<br />
						Together
					</motion.h2>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
				>
					<MagneticButton
						href="mailto:notnotrachit@gmail.com"
						className="bg-white text-black px-8 py-4"
					>
						<span className="flex items-center gap-3 text-lg md:text-xl font-medium">
							<Mail className="w-5 h-5" />
							Get in Touch <ArrowUpRight className="w-5 h-5" />
						</span>
					</MagneticButton>
				</motion.div>
			</div>

		</section>
	);
}
