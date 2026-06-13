"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useRef } from "react";
import { projects } from "../../data/projects";
import { MagneticButton } from "../ui/MagneticButton";
import { SectionHeader } from "../ui/SectionHeader";

export function Projects() {
	const containerRef = useRef<HTMLDivElement>(null);

	// Filter only featured projects for the main display
	const featuredProjects = projects.filter((p) => p.featured);

	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.1,
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
				ease: [0.16, 1, 0.3, 1] as const,
			},
		},
	};

	return (
		<section
			id="projects"
			ref={containerRef}
			className="relative w-full py-24 md:py-32 bg-transparent z-10"
		>
			{/* Background gradients */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

			<div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
				<SectionHeader
					number="05."
					label="SELECTED WORKS"
					title="Projects"
					description="Featured projects showcasing my expertise in full-stack development, Web3, and building scalable solutions."
				/>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					variants={containerVariants}
					className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-12"
				>
					{featuredProjects.map((project, index) => (
						<motion.div
							key={project.id}
							variants={itemVariants}
							className="group relative flex flex-col gap-6"
						>
							<div className="flex flex-col gap-4 relative z-10">
								{/* Project Image */}
								<div className="aspect-video w-full overflow-hidden rounded-lg bg-neutral-900 border border-white/10 group-hover:border-cyan-500/30 transition-colors duration-500">
									{project.image ? (
										<img
											src={project.image}
											alt={project.title}
											className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center bg-cyan-950/30">
											<span className="font-display text-2xl font-bold text-white/20 uppercase">
												{project.title}
											</span>
										</div>
									)}
								</div>

								<div className="flex items-baseline justify-between border-b border-white/10 pb-4 group-hover:border-cyan-500/50 transition-colors duration-500">
									<div className="flex items-baseline gap-4">
										<span className="font-mono text-sm text-neutral-500 group-hover:text-cyan-400 transition-colors">
											0{index + 1}
										</span>
										<a
											href={project.link || project.github || "#"}
											target="_blank"
											rel="noopener noreferrer"
											className="block"
										>
											<h3 className="font-display text-2xl md:text-3xl font-bold uppercase text-neutral-300 transition-colors duration-300 group-hover:text-white">
												{project.title}
											</h3>
										</a>
									</div>
									<div className="flex gap-3">
										{project.github && (
											<a
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												className="text-neutral-500 hover:text-white transition-colors"
											>
												<Github className="w-5 h-5" />
											</a>
										)}
										{project.link && (
											<a
												href={project.link}
												target="_blank"
												rel="noopener noreferrer"
												className="text-neutral-500 hover:text-white transition-colors"
											>
												<ArrowUpRight className="w-5 h-5" />
											</a>
										)}
									</div>
								</div>

								<div className="flex flex-col gap-2">
									<p className="font-mono text-cyan-400 text-sm">
										{project.shortDescription}
									</p>
									<p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 group-hover:text-neutral-300 transition-colors">
										{project.description}
									</p>
								</div>

								<div className="flex flex-wrap gap-2 mt-2">
									{project.techStack.slice(0, 3).map((tech) => (
										<span
											key={tech}
											className="font-mono text-[10px] uppercase text-neutral-500 border border-white/5 px-2 py-1 bg-white/[0.02] group-hover:border-cyan-500/20 group-hover:text-cyan-500/70 transition-colors"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				<div className="mt-20 flex justify-center">
					<MagneticButton href="https://github.com/notnotrachit?tab=repositories">
						View All Archives
					</MagneticButton>
				</div>
			</div>
		</section>
	);
}
