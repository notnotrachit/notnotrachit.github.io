"use client";

import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowUpRight, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/projects";
import { MagneticButton } from "../ui/MagneticButton";
import { SectionHeader } from "../ui/SectionHeader";

export function Projects() {
	const [activeProject, setActiveProject] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const cursorRef = useRef<HTMLDivElement>(null);

	// Filter only featured projects for the main display
	const featuredProjects = projects.filter((p) => p.featured);

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			if (!cursorRef.current) return;

			// Calculate position relative to viewport to avoid offset issues
			gsap.to(cursorRef.current, {
				x: e.clientX,
				y: e.clientY,
				duration: 0.8,
				ease: "power3.out",
			});
		};

		window.addEventListener("mousemove", moveCursor);
		return () => window.removeEventListener("mousemove", moveCursor);
	}, []);

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
				ease: [0.16, 1, 0.3, 1],
			},
		},
	};

	return (
		<section
			id="projects"
			ref={containerRef}
			className="relative w-full py-24 md:py-32 bg-transparent z-10 overflow-hidden"
		>
			{/* Background gradients */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

			<div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
				<SectionHeader
					number="04."
					label="SELECTED WORKS"
					title="Projects"
					description="Featured projects showcasing my expertise in full-stack development, Web3, and building scalable solutions."
				/>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					variants={containerVariants}
					className="flex flex-col"
				>
					{featuredProjects.map((project, index) => (
						<motion.div
							key={project.id}
							variants={itemVariants}
							className="group relative border-b border-white/10 py-12 md:py-16 transition-all duration-500 hover:px-8 hover:bg-white/[0.02]"
							onMouseEnter={() => setActiveProject(project.id)}
							onMouseLeave={() => setActiveProject(null)}
						>
							<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
								<div className="flex items-baseline gap-6">
									<span className="font-mono text-sm text-neutral-500">
										0{index + 1}
									</span>
									<a
										href={project.link || project.github || "#"}
										target="_blank"
										rel="noopener noreferrer"
										className="block"
									>
										<h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-neutral-300 transition-colors duration-300 group-hover:text-white">
											{project.title}
										</h3>
									</a>
								</div>

								<div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
									<div className="flex flex-wrap justify-end gap-2 max-w-[300px]">
										{project.techStack.slice(0, 3).map((tech) => (
											<span
												key={tech}
												className="font-mono text-xs text-indigo-300 border border-indigo-500/20 px-3 py-1 bg-indigo-500/5"
											>
												{tech}
											</span>
										))}
									</div>

									<div className="flex gap-4">
										{project.github && (
											<a
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												className="p-3 border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
											>
												<Github className="w-5 h-5 md:w-6 md:h-6" />
											</a>
										)}
										{project.link && (
											<a
												href={project.link}
												target="_blank"
												rel="noopener noreferrer"
												className="p-3 border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
											>
												<ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
											</a>
										)}
									</div>
								</div>
							</div>

							<div className="h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:h-auto group-hover:opacity-100 group-hover:mt-6">
								<p className="text-neutral-400 font-body leading-relaxed max-w-xl text-sm md:text-base">
									{project.description}
								</p>
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

			{/* Floating Image Preview */}
			<AnimatePresence>
				{activeProject !== null && (
					<motion.div
						ref={cursorRef}
						initial={{ scale: 0.5, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.5, opacity: 0 }}
						transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
						className="fixed top-0 left-0 w-[400px] h-[250px] overflow-hidden pointer-events-none z-50 hidden lg:block shadow-2xl shadow-indigo-500/10 border border-white/10 -translate-x-1/2 -translate-y-1/2"
						style={{
							position: "fixed",
							left: 0,
							top: 0,
						}}
					>
						{projects.map(
							(project) =>
								project.id === activeProject && (
									<div
										key={project.id}
										className="relative w-full h-full bg-neutral-900"
									>
										{project.image ? (
											<img
												src={project.image}
												alt={project.title}
												className="w-full h-full object-cover"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center bg-indigo-950">
												<span className="font-display text-2xl font-bold text-white/20 uppercase">
													{project.title}
												</span>
											</div>
										)}
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
										<div className="absolute bottom-4 left-4 right-4">
											<div className="flex gap-2">
												{project.techStack.slice(0, 3).map((t) => (
													<span
														key={t}
														className="text-[10px] uppercase font-mono text-white/70 bg-white/10 px-2 py-1"
													>
														{t}
													</span>
												))}
											</div>
										</div>
									</div>
								),
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
