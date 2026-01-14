"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { Parallax } from "../ui/Parallax";

function XLogo({ className, size }: { className?: string; size?: number }) {
	return (
		<svg
			viewBox="0 0 24 24"
			aria-hidden="true"
			className={className}
			width={size}
			height={size}
			fill="currentColor"
		>
			<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
		</svg>
	);
}

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
			href: "https://linkedin.com/in/rachitkhurana1",
			label: "LinkedIn",
		},
		{
			icon: XLogo,
			href: "https://x.com/notnotrachit",
			label: "X",
		},
		{ icon: Mail, href: "mailto:notnotrachit@gmail.com", label: "Email" },
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
				ease: [0.16, 1, 0.3, 1] as const,
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
				ease: [0.16, 1, 0.3, 1] as const,
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
				ease: [0.16, 1, 0.3, 1] as const,
				delay: 1.5 + i * 0.1,
			},
		}),
	};

	return (
		<section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
			{/* Aurora Background Elements are in index.css, adding local accents */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 blur-[100px] -z-10 animate-pulse-slow pointer-events-none mix-blend-screen" />

			<div className="z-10 text-center px-4 md:px-8 w-full max-w-[1600px] mx-auto flex flex-col items-center">
				{/* Status Badge */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 1.0 }}
					className="mb-8 md:mb-12 hidden"
				>
					<div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_0_rgba(6,182,212,0.1)] hover:bg-white/10 transition-colors cursor-default">
						<span className="relative flex h-2.5 w-2.5">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
							<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
						</span>
						<span className="font-mono text-xs md:text-sm text-cyan-100/80 tracking-wide uppercase">
							Available for new opportunities
						</span>
					</div>
				</motion.div>

				{/* Profile Picture - Holographic/Cyber Style */}
				<motion.div
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{
						scale: 1,
						opacity: 1,
						y: [0, -10, 0] // Floating animation
					}}
					transition={{
						duration: 0.8,
						ease: [0.16, 1, 0.3, 1] as const,
						delay: 0.2,
						y: {
							repeat: Infinity,
							duration: 3,
							ease: "easeInOut"
						}
					}}
					className="mb-10 relative group"
				>
					{/* Glowing Backlight */}
					<div className="absolute inset-0 bg-cyan-500/30 blur-[40px] rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 opacity-50" />

					{/* Glass Container */}
					<div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border border-white/10 bg-cyan-950/20 backdrop-blur-sm shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)] transition-all duration-500 group-hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.6)]">

						{/* Animated Border Gradient */}
						<div className="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-tr from-cyan-500/50 via-transparent to-cyan-500/50 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

						{/* Tech Corners */}
						<div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 rounded-tl-md z-30" />
						<div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 rounded-tr-md z-30" />
						<div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 rounded-bl-md z-30" />
						<div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 rounded-br-md z-30" />

						{/* Image */}
						<img
							src="/profile.jpg"
							alt="Rachit Khurana"
							className="absolute inset-0 w-full h-full object-cover transition-all duration-700 mixture-blend-overlay group-hover:scale-110 md:grayscale group-hover:grayscale-0"
						/>

						{/* Holographic Tint Overlay */}
						<div className="absolute inset-0 bg-cyan-500/5 group-hover:opacity-0 transition-opacity duration-500 z-10" />

						{/* Scanline Animation */}
						<div className="absolute inset-0 z-20 pointer-events-none opacity-20 overflow-hidden">
							<div className="w-full h-[200%] bg-[linear-gradient(transparent,rgba(6,182,212,0.4),transparent)] animate-scanline" />
						</div>

						{/* Glitch/Noise Texture overlay (optional subtle grain) */}
						<div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20" />
					</div>
				</motion.div>

				{/* Main Title */}
				<Parallax offset={-50} className="w-full max-w-full flex justify-center">
					<motion.h1
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="w-full font-display font-bold text-[clamp(2.2rem,8vw,9rem)] leading-[0.9] tracking-tighter text-nowrap overflow-hidden py-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-2xl"
					>
						{splitTitle.map(({ char, key, isSpace }) => (
							<motion.span
								key={key}
								variants={charVariants}
								className={`inline-block ${isSpace ? "w-2 md:w-8" : ""}`}
							>
								{char}
							</motion.span>
						))}
					</motion.h1>
				</Parallax>

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
					<Parallax offset={-30}>
						<motion.p
							variants={fadeUpVariants}
							className="font-body text-muted-foreground text-lg md:text-xl text-center leading-relaxed"
						>
							Full Stack Engineer crafting{" "}
							<span className="text-cyan-500 font-medium">Scalable Web Apps</span>{" "}
							and exploring the decentralized web.
						</motion.p>
					</Parallax>

					<motion.div
						variants={fadeUpVariants}
						className="flex flex-col md:flex-row items-center gap-6"
					>
						<MagneticButton
							href="/resume.pdf"
							className="group bg-white text-black border-none"
							target="_blank"
						>
							<span className="flex items-center gap-2 font-bold">
								Resume <FileText className="w-4 h-4 transition-transform group-hover:scale-110" />
							</span>
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
							className="p-3 bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(6,182,212,0.1)] hover:bg-white/10 hover:scale-110 hover:text-cyan-400 transition-all duration-300 group"
							aria-label={social.label}
						>
							<social.icon
								size={20}
								className="group-hover:stroke-cyan-400 transition-colors"
							/>
						</motion.a>
					))}
				</div>
			</div>
		</section>
	);
}
