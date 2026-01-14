"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { projects } from "../../data/projects";
import { achievements } from "../../data/achievements";

export function About() {
	const fadeInLeft = {
		hidden: { x: -50, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1] as const,
			},
		},
	};

	const fadeInRight = {
		hidden: { x: 50, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1] as const,
				delay: 0.2,
			},
		},
	};

	return (
		<section id="about" className="py-24 md:py-32 relative overflow-hidden">
			<div className="container mx-auto px-6 md:px-12 max-w-7xl">
				<SectionHeader
					number="01."
					label="ABOUT"
					title="About Me"
					description="Caffeine Powered Bit Flipper"
				/>

				<div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Terminal / Code Block Visual */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
						variants={fadeInLeft}
						className="bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(6,182,212,0.1)] p-1 bg-gradient-to-br from-white/10 to-transparent order-2 md:order-1"
					>
						<div className="bg-[#020617] p-6 font-mono text-sm overflow-hidden shadow-2xl border border-white/5">
							{/* Terminal Header */}
							<div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
								<div className="flex gap-2">
									<div className="w-3 h-3 bg-red-500/80" />
									<div className="w-3 h-3 bg-yellow-500/80" />
									<div className="w-3 h-3 bg-cyan-500/80" />
								</div>
								<div className="text-xs text-muted-foreground/50">
									rachit.json
								</div>
							</div>

							<div className="space-y-4 text-cyan-200/90 leading-relaxed">
								<p>
									<span className="text-sky-500">const</span>{" "}
									<span className="text-cyan-300">developer</span>{" "}
									<span className="text-sky-500">=</span> {"{"}
								</p>
								<p className="pl-6">
									<span className="text-sky-400">name</span>:{" "}
									<span className="text-cyan-400">"Rachit Khurana"</span>,
								</p>
								<p className="pl-6">
									<span className="text-sky-400">role</span>:{" "}
									<span className="text-cyan-400">"Full Stack Engineer"</span>,
								</p>
								<p className="pl-6">
									<span className="text-sky-400">stack</span>: [
									<span className="text-cyan-400">"Next.js"</span>,{" "}
									<span className="text-cyan-400">"Python"</span>,{" "}
									<span className="text-cyan-400">"Solidity"</span>],
								</p>
								<p className="pl-6">
									<span className="text-sky-400">passions</span>: [
									<span className="text-cyan-400">"Open Source"</span>,{" "}
									<span className="text-cyan-400">"Web3"</span>,{" "}
									<span className="text-cyan-400">"Hackathons"</span>],
								</p>
								<p className="pl-6">
									<span className="text-sky-400">status</span>:{" "}
									<span className="text-cyan-400">"Building & Learning"</span>
								</p>
								<p>{"};"}
								</p>
							</div>
						</div>
					</motion.div>

					{/* Text Content */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
						variants={fadeInRight}
						className="space-y-6 order-1 md:order-2"
					>
						<p className="text-lg text-muted-foreground leading-relaxed">
							I'm a passionate developer who started with simple HTML websites
							and evolved into building complex, scalable full-stack
							applications. My journey is fueled by a love for open source and
							the decentralized web.
						</p>
						<p className="text-lg text-muted-foreground leading-relaxed">
							When I'm not coding, you can find me participating in hackathons
							(and winning a few!), mentoring peers, or exploring the latest
							trends in AI and blockchain technology.
						</p>
						<div className="flex flex-wrap gap-4 pt-4 hidden">
							<div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_0_rgba(6,182,212,0.1)] px-4 py-2">
								<span className="text-2xl font-bold text-cyan-400">5+</span>
								<span className="text-sm text-muted-foreground ml-2">Years Coding</span>
							</div>
							<div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_0_rgba(6,182,212,0.1)] px-4 py-2">
								<span className="text-2xl font-bold text-cyan-400">{projects.length}+</span>
								<span className="text-sm text-muted-foreground ml-2">Projects</span>
							</div>
							<div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_0_rgba(6,182,212,0.1)] px-4 py-2">
								<span className="text-2xl font-bold text-cyan-400">{achievements.length}+</span>
								<span className="text-sm text-muted-foreground ml-2">Hackathons Won</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
