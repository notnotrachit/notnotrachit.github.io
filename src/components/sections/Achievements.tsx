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
					number="06."
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
							className="group relative bg-white/[0.02] border border-white/5 overflow-hidden hover:border-cyan-500/20 transition-all duration-300 flex flex-row md:block items-stretch md:items-start h-32 md:h-auto"
						>
							<div className="w-1/3 md:w-full md:aspect-video overflow-hidden relative shrink-0 md:mb-4">
								<img
									src={achievement.image}
									alt={achievement.title}
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-r md:bg-gradient-to-t from-[#020617]/80 md:from-[#020617] via-transparent to-transparent opacity-60" />

								<div className="absolute top-2 right-2 md:top-3 md:right-3 bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 px-2 py-1 md:px-3 md:py-1.5 rounded-full">
									<Trophy className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
								</div>
							</div>

							<div className="p-4 flex-1 flex flex-col justify-center md:block md:p-6 md:pt-2 overflow-hidden">
								<h3 className="font-display text-base md:text-xl font-bold text-white mb-1.5 md:mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2 md:line-clamp-none">
									{achievement.title}
								</h3>

								<div className="flex flex-col gap-1.5 md:gap-3">
									<div className="flex flex-col">
										<p className="text-cyan-200 font-medium text-xs md:text-sm">
											{achievement.award}
										</p>
										{achievement.subAward && (
											<p className="text-neutral-500 text-[10px] md:text-xs mt-0.5 md:mt-1">
												{achievement.subAward}
											</p>
										)}
									</div>

									{achievement.teammates &&
										achievement.teammates.length > 0 && (
											<div className="flex items-start gap-2 pt-2 md:pt-3 border-t border-white/5 mt-1 md:mt-2 hidden md:flex">
												<Users className="w-4 h-4 text-neutral-500 mt-0.5" />
												<p className="text-xs text-neutral-400 leading-relaxed line-clamp-1">
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
