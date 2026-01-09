"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

export function Hero() {
	const title = "RACHIT KHURANA";
	const splitTitle = title.split("").map((char, i) => ({
		char,
		key: `${char}-${i}`,
		isSpace: char === " ",
	}));

	const socials = [
		{ icon: Github, href: "https://github.com/notnotrachit", label: "GitHub" },
		{
			icon: Linkedin,
			href: "https://linkedin.com/in/rachit-khurana",
			label: "LinkedIn",
		},
		{
			icon: Twitter,
			href: "https://twitter.com/notnotrachit",
			label: "Twitter",
		},
		{ icon: Mail, href: "mailto:rachit@example.com", label: "Email" },
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.03,
				delayChildren: 0.1,
			},
		},
	};

	const charVariants = {
		hidden: { y: 100, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
			},
		},
	};

	const fadeUpVariants = {
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

	const socialVariants = {
		hidden: { x: -20, opacity: 0 },
		visible: (i: number) => ({
			x: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
				delay: 1.5 + i * 0.1,
			},
		}),
	};

	return (
		<section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
			{/* Aurora Background Elements are in index.css, adding local accents */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[100px] -z-10 animate-pulse-slow pointer-events-none mix-blend-screen" />

			<div className="z-10 text-center px-4 md:px-8 w-full max-w-[1600px] mx-auto flex flex-col items-center">
				{/* Status Badge */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
					className="mb-8 md:mb-12"
				>
					<div className="flex items-center gap-3 px-4 py-2 glass hover:bg-white/10 transition-colors cursor-default">
						<span className="relative flex h-2.5 w-2.5">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
							<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
						</span>
						<span className="font-mono text-xs md:text-sm text-primary-foreground/80 tracking-wide uppercase">
							Available for new opportunities
						</span>
					</div>
				</motion.div>

				{/* Main Title */}
				<motion.h1
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="font-display font-bold text-[clamp(2.5rem,10vw,8rem)] leading-[0.9] tracking-tighter text-nowrap overflow-hidden py-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-2xl"
				>
					{splitTitle.map(({ char, key, isSpace }) => (
						<motion.span
							key={key}
							variants={charVariants}
							className={`inline-block ${isSpace ? "w-4 md:w-8" : ""}`}
						>
							{char}
						</motion.span>
					))}
				</motion.h1>

				{/* Description */}
				<motion.div
					initial="hidden"
					animate="visible"
					variants={{
						hidden: {},
						visible: {
							transition: {
								staggerChildren: 0.2,
								delayChildren: 1.2,
							},
						},
					}}
					className="mt-8 md:mt-12 flex flex-col items-center gap-8 max-w-2xl"
				>
					<motion.p
						variants={fadeUpVariants}
						className="font-body text-muted-foreground text-lg md:text-xl text-center leading-relaxed"
					>
						Full Stack Engineer crafting{" "}
						<span className="text-primary font-medium">Scalable Web Apps</span>{" "}
						and exploring the decentralized web.
					</motion.p>

					<motion.div
						variants={fadeUpVariants}
						className="flex flex-col md:flex-row items-center gap-6"
					>
						<MagneticButton
							href="#projects"
							className="group bg-white text-black hover:bg-neutral-200 border-none"
						>
							<span className="flex items-center gap-2 font-bold">
								View Projects{" "}
								<ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
							</span>
						</MagneticButton>

						<MagneticButton href="#contact" className="group">
							<span className="flex items-center gap-2">Contact Me</span>
						</MagneticButton>
					</motion.div>
				</motion.div>

				{/* Social Links */}
				<div className="mt-16 md:mt-24 flex items-center gap-6">
					{socials.map((social, i) => (
						<motion.a
							key={social.label}
							custom={i}
							initial="hidden"
							animate="visible"
							variants={socialVariants}
							href={social.href}
							target="_blank"
							rel="noreferrer"
							className="p-3 glass hover:bg-white/10 hover:scale-110 hover:text-primary transition-all duration-300 group"
							aria-label={social.label}
						>
							<social.icon
								size={20}
								className="group-hover:stroke-primary transition-colors"
							/>
						</motion.a>
					))}
				</div>
			</div>
		</section>
	);
}
