"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { certifications } from "../../data/certifications";
import { education } from "../../data/education";
import { SectionHeader } from "../ui/SectionHeader";

export function Education() {
	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.15,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
			},
		},
	};

	return (
		<section id="education" className="py-24 md:py-32 relative">
			<div className="container mx-auto px-6 md:px-12 max-w-7xl">
				<SectionHeader
					number="07."
					label="LEARNING PATH"
					title="Education"
					description="Academic background and professional certifications."
				/>

				<div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
					{/* Education Column */}
					<div>
						<div className="flex items-center gap-3 mb-10">
							<div className="p-2 bg-cyan-500/10 text-cyan-500">
								<GraduationCap size={20} />
							</div>
							<h3 className="text-lg font-semibold font-display text-white">
								Education
							</h3>
						</div>

						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.2 }}
							variants={containerVariants}
							className="space-y-6"
						>
							{education.map((edu) => (
								<motion.div
									key={edu.id}
									variants={itemVariants}
									className="group relative"
								>
									<div className="flex gap-4 p-5 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300">
										{/* Logo */}
										<div className="shrink-0">
											<div className="w-14 h-14 overflow-hidden bg-white/5 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
												<img
													src={edu.logo}
													alt={edu.school}
													className="w-full h-full object-cover"
												/>
											</div>
										</div>

										{/* Content */}
										<div className="flex-1 min-w-0">
											<div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
												<h4 className="font-display text-base font-semibold text-white group-hover:text-cyan-500 transition-colors">
													{edu.school}
												</h4>
												<span className="font-mono text-xs text-muted-foreground/70 bg-white/5 px-2 py-0.5">
													{edu.period}
												</span>
											</div>
											<p className="text-sm text-cyan-500/80 font-medium mb-1">
												{edu.degree}
											</p>
											<p className="text-sm text-muted-foreground">
												{edu.details}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>

					{/* Certifications Column */}
					<div>
						<div className="flex items-center gap-3 mb-10">
							<div className="p-2 bg-sky-500/10 text-sky-400">
								<Award size={20} />
							</div>
							<h3 className="text-lg font-semibold font-display text-white">
								Certifications
							</h3>
						</div>

						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.2 }}
							variants={containerVariants}
							className="space-y-3"
						>
							{certifications.map((cert) => (
								<motion.a
									key={cert.id}
									variants={itemVariants}
									href={cert.credentialUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-sky-500/30 transition-all duration-300"
								>
									<div className="flex-1 min-w-0">
										<h4 className="font-display text-sm font-medium text-white group-hover:text-sky-400 transition-colors">
											{cert.name}
										</h4>
										<p className="text-xs text-muted-foreground mt-0.5">
											{cert.issuingAuthority}
										</p>
									</div>
									<ExternalLink
										size={14}
										className="shrink-0 text-muted-foreground/50 group-hover:text-sky-400 transition-colors"
									/>
								</motion.a>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
