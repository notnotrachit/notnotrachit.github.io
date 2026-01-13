"use client";

import { motion } from "framer-motion";
import { Trophy, Users } from "lucide-react";
import { achievements } from "../../data/achievements";
import { SectionHeader } from "../ui/SectionHeader";

export function Achievements() {
	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: [0.16, 1, 0.3, 1] as const,
			},
		},
	};

	return (
		<section
			id="achievements"
			className="relative w-full py-24 md:py-32 bg-transparent z-10"
		>
			<div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
				<SectionHeader
					number="05."
					label="HALL OF FAME"
					title="Achievements"
					description="Recognition for my skills in competitive programming and hackathons."
				/>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					variants={containerVariants}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{achievements.map((achievement) => (
						<motion.div
							key={achievement.id}
							variants={itemVariants}
							className="group relative bg-white/[0.02] border border-white/5 overflow-hidden hover:border-cyan-500/20 transition-all duration-300"
						>
							<div className="aspect-video w-full overflow-hidden mb-4 relative">
								<img
									src={achievement.image}
									alt={achievement.title}
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
								
								<div className="absolute top-3 right-3 bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 px-3 py-1.5 rounded-full">
									<Trophy className="w-4 h-4 text-cyan-400" />
								</div>
							</div>

							<div className="p-6 pt-2">
								<h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
									{achievement.title}
								</h3>
								
								<div className="flex flex-col gap-3">
									<div className="flex flex-col">
										<p className="text-cyan-200 font-medium text-sm">
											{achievement.award}
										</p>
										{achievement.subAward && (
											<p className="text-neutral-500 text-xs mt-1">
												{achievement.subAward}
											</p>
										)}
									</div>
									
									{(achievement.teammates && achievement.teammates.length > 0) && (
										<div className="flex items-start gap-2 pt-3 border-t border-white/5 mt-2">
											<Users className="w-4 h-4 text-neutral-500 mt-0.5" />
											<p className="text-xs text-neutral-400 leading-relaxed">
												with {achievement.teammates.join(", ")}
											</p>
										</div>
									)}
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
