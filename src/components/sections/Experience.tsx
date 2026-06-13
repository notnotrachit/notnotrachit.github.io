"use client";

import { motion } from "framer-motion";
import { Briefcase, Users } from "lucide-react";
import { type ExperienceItem, experience } from "../../data/experience";
import { SectionHeader } from "../ui/SectionHeader";

export function Experience() {
	const workExperience = experience.filter((item) => item.type === "work");
	const communityExperience = experience.filter(
		(item) => item.type === "volunteering",
	);

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
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
			},
		},
	};

	const ExperienceCard = ({ item }: { item: ExperienceItem }) => (
		<motion.div
			variants={itemVariants}
			className="group relative pl-8 border-l border-white/10 hover:border-cyan-500/50 transition-colors"
		>
			{/* Timeline dot */}
			<div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-background border-2 border-cyan-500/50 group-hover:border-cyan-500 group-hover:bg-cyan-500/20 transition-all" />

			<div className="pb-10">
				{/* Header row */}
				<div className="flex items-start gap-4 mb-3">
					<div className="shrink-0 w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-white/20 transition-colors">
						<img
							src={item.logo}
							alt={`${item.company} logo`}
							className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
							onError={(e) => {
								(e.target as HTMLImageElement).style.display = "none";
							}}
						/>
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
							<h4 className="font-display text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
								{item.company}
							</h4>
							<span className="font-mono text-xs text-muted-foreground">
								{item.period}
							</span>
						</div>
						<p className="text-sm text-muted-foreground mt-0.5">{item.role}</p>
					</div>
				</div>

				{/* Description */}
				<p className="text-sm text-muted-foreground leading-relaxed mb-4">
					{item.description}
				</p>

				{/* Technologies */}
				<div className="flex flex-wrap gap-2">
					{item.technologies.map((tech) => (
						<span
							key={tech}
							className="px-2 py-0.5 text-xs font-mono text-cyan-400/80 bg-cyan-500/5 border border-cyan-500/10"
						>
							{tech}
						</span>
					))}
				</div>
			</div>
		</motion.div>
	);

	return (
		<section
			id="experience"
			className="relative w-full py-8 md:py-24 bg-transparent"
		>
			{/* Aurora Background Elements */}
			<div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-600/20 blur-[120px] -translate-x-1/2 pointer-events-none" />
			<div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-600/15 blur-[120px] translate-x-1/2 pointer-events-none" />

			<div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
				<SectionHeader
					number="04."
					label="EXPERIENCE"
					title="Experience"
					description="My professional journey and community involvement, building scalable solutions and fostering tech communities."
				/>

				<div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
					{/* Work Experience Column */}
					<div>
						<div className="flex items-center gap-3 mb-10">
							<div className="p-2 bg-cyan-500/10 text-cyan-400">
								<Briefcase size={20} />
							</div>
							<h3 className="text-lg font-semibold font-display text-white">
								Work Experience
							</h3>
						</div>

						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.2 }}
							variants={containerVariants}
						>
							{workExperience.map((item) => (
								<ExperienceCard key={item.id} item={item} />
							))}
						</motion.div>
					</div>

					{/* Community Experience Column */}
					<div>
						<div className="flex items-center gap-3 mb-10">
							<div className="p-2 bg-blue-500/10 text-blue-400">
								<Users size={20} />
							</div>
							<h3 className="text-lg font-semibold font-display text-white">
								Community
							</h3>
						</div>

						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.2 }}
							variants={containerVariants}
						>
							{communityExperience.map((item) => (
								<ExperienceCard key={item.id} item={item} />
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
