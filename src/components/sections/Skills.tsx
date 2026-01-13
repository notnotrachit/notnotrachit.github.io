"use client";

import { motion } from "framer-motion";
import { IconCloud } from "../ui/IconCloud";
import { SectionHeader } from "../ui/SectionHeader";

export function Skills() {
	const skills = [
		{
			category: "Languages & Databases",
			items: [
				"Python",
				"JavaScript",
				"TypeScript",
				"Java",
				"Golang",
				"C++",
				"SQL",
				"MongoDB",
				"Postgres",
				"Redis",
			],
		},
		{
			category: "Frameworks & Libraries",
			items: [
				"Next.js",
				"React",
				"Django",
				"Flask",
				"FastAPI",
				"TailwindCSS",
				"Framer Motion",
				"Three.js",
			],
		},
		{
			category: "Tools & DevOps",
			items: [
				"Git",
				"Docker",
				"AWS",
				"Azure",
				"Linux",
				"Vercel",
				"GitHub Actions",
			],
		},
	];

	const cloudIcons = [
		"python",
		"javascript",
		"typescript",
		"java",
		"go",
		"cplusplus",
		"postgresql",
		"mongodb",
		"redis",
		"nextdotjs",
		"react",
		"django",
		"flask",
		"fastapi",
		"tailwindcss",
		"threejs",
		"git",
		"docker",
		"amazonwebservices",
		"azure",
		"linux",
		"vercel",
		"github",
	].map((slug) => `https://cdn.simpleicons.org/${slug}`);

	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { x: -50, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
			},
		},
	};

	const cloudVariants = {
		hidden: { scale: 0.9, opacity: 0 },
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				duration: 1,
				ease: [0.34, 1.56, 0.64, 1],
			},
		},
	};

	return (
		<section id="skills" className="py-8 md:py-24 relative">
			<div className="container mx-auto px-6 md:px-12 max-w-7xl">
				<SectionHeader
					number="02."
					label="SKILLS"
					title="Skills & Tools"
				/>

				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Skill Lists */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
						variants={containerVariants}
						className="space-y-12"
					>
						{skills.map((group, idx) => (
							<motion.div key={group.category} variants={itemVariants}>
								<h3 className="text-xl font-bold mb-6 flex items-center gap-3">
									<span className="w-8 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
									{group.category}
								</h3>
								<div className="flex flex-wrap gap-3">
									{group.items.map((skill) => (
										<span
											key={skill}
											className="px-4 py-2 bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_0_rgba(6,182,212,0.1)] hover:bg-white/10 text-sm font-mono text-muted-foreground hover:text-white hover:border-cyan-500/30 transition-all duration-300 cursor-default"
										>
											{skill}
										</span>
									))}
								</div>
							</motion.div>
						))}
					</motion.div>

					{/* Icon Cloud */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
						variants={cloudVariants}
						className="relative flex items-center justify-center min-h-[500px] p-8"
					>
						<div className="absolute inset-0" />
						<IconCloud images={cloudIcons} />
					</motion.div>
				</div>
			</div>
		</section>
	);
}
