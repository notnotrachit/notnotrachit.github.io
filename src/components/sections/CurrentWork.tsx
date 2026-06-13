"use client";

import { motion } from "framer-motion";
import { Command, ExternalLink, Mic2, Smartphone } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

function AppleLogo({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 814 1000"
			className={className}
			aria-hidden="true"
		>
			<path
				fill="currentColor"
				d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
			/>
		</svg>
	);
}

function MicrosoftLogo({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			className={className}
			aria-hidden="true"
		>
			<path fill="currentColor" d="M121.666 121.666H0V0h121.666z" />
			<path fill="currentColor" d="M256 121.666H134.335V0H256z" />
			<path fill="currentColor" d="M121.663 256.002H0V134.336h121.663z" />
			<path fill="currentColor" d="M256 256.002H134.335V134.336H256z" />
		</svg>
	);
}

function AndroidLogo({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 150"
			className={className}
			aria-hidden="true"
		>
			<path
				fill="currentColor"
				d="M255.285 143.47c-.084-.524-.164-1.042-.251-1.56a128.119 128.119 0 0 0-12.794-38.288 128.778 128.778 0 0 0-23.45-31.86 129.166 129.166 0 0 0-22.713-18.005c.049-.08.09-.168.14-.25 2.582-4.461 5.172-8.917 7.755-13.38l7.576-13.068c1.818-3.126 3.632-6.26 5.438-9.386a11.776 11.776 0 0 0 .662-10.484 11.668 11.668 0 0 0-4.823-5.536 11.85 11.85 0 0 0-5.004-1.61 11.963 11.963 0 0 0-2.218.018 11.738 11.738 0 0 0-8.968 5.798c-1.814 3.127-3.628 6.26-5.438 9.386l-7.576 13.069c-2.583 4.462-5.173 8.918-7.755 13.38-.282.487-.567.973-.848 1.467-.392-.157-.78-.313-1.172-.462-14.24-5.43-29.688-8.4-45.836-8.4-.442 0-.879 0-1.324.006-14.357.143-28.152 2.64-41.022 7.12a119.434 119.434 0 0 0-4.42 1.642c-.262-.455-.532-.911-.79-1.367-2.583-4.462-5.173-8.918-7.755-13.38L65.123 15.25c-1.818-3.126-3.632-6.259-5.439-9.386A11.736 11.736 0 0 0 48.5.048 11.71 11.71 0 0 0 43.49 1.66a11.716 11.716 0 0 0-4.077 4.063c-.281.474-.532.967-.742 1.473a11.808 11.808 0 0 0-.365 8.188c.259.786.594 1.554 1.023 2.296a3973.32 3973.32 0 0 1 5.439 9.386c2.53 4.357 5.054 8.713 7.58 13.069 2.582 4.462 5.168 8.918 7.75 13.38.02.038.046.075.065.112A129.184 129.184 0 0 0 45.32 64.38a129.693 129.693 0 0 0-22.2 24.015 127.737 127.737 0 0 0-9.34 15.24 128.238 128.238 0 0 0-10.843 28.764 130.743 130.743 0 0 0-1.951 9.524c-.087.518-.167 1.042-.247 1.56A124.978 124.978 0 0 0 0 149.118h256c-.205-1.891-.449-3.77-.734-5.636l.019-.012Z"
			/>
			<path
				fill="#0f1b2e"
				d="M194.59 113.712c5.122-3.41 5.867-11.3 1.661-17.62-4.203-6.323-11.763-8.682-16.883-5.273-5.122 3.41-5.868 11.3-1.662 17.621 4.203 6.322 11.764 8.682 16.883 5.272ZM78.518 108.462c4.206-6.321 3.46-14.21-1.662-17.62-5.123-3.41-12.68-1.05-16.886 5.27-4.203 6.323-3.458 14.212 1.662 17.622 5.122 3.41 12.683 1.05 16.886-5.272Z"
			/>
		</svg>
	);
}

const platforms = [
	{ name: "macOS", Icon: AppleLogo, iconClassName: "h-5 w-4 text-cyan-300" },
	{ name: "iOS", Icon: Smartphone },
	{
		name: "Windows",
		Icon: MicrosoftLogo,
		iconClassName: "h-4 w-4 text-cyan-300",
	},
	{
		name: "Android",
		Icon: AndroidLogo,
		iconClassName: "h-4 w-7 text-cyan-300",
	},
];

const productModes = [
	{
		title: "AI Dictation",
		description:
			"Voice input that helps people move from spoken thoughts to clean, editable text faster.",
		Icon: Mic2,
	},
	{
		title: "Command Mode",
		description:
			"Hold a shortcut, speak your prompt, and get the AI response inserted where your cursor is.",
		Icon: Command,
	},
];

export function CurrentWork() {
	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 24, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.75,
				ease: [0.16, 1, 0.3, 1] as const,
			},
		},
	};

	return (
		<section
			id="current-work"
			className="relative overflow-hidden py-8 md:py-24"
		>
			<div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
			<div className="pointer-events-none absolute right-0 top-12 h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[120px]" />

			<div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12">
				<SectionHeader
					number="02."
					label="NOW"
					title="Currently Working On"
					description="BOSS AI - Cross-platform AI dictation with command mode, available on macOS, iOS, Windows, and Android."
				/>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.25 }}
					variants={containerVariants}
					className="border-y border-white/10 py-8 md:py-10"
				>
					<div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
						<motion.div variants={itemVariants} className="max-w-2xl">
							<div className="mb-5 flex flex-wrap items-center gap-3">
								<span className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
									Hyathi Technologies
								</span>
								<span className="h-px w-10 bg-cyan-500/40" />
								<span className="font-mono text-xs uppercase tracking-[0.22em] text-neutral-500">
									Internship project
								</span>
							</div>

							<p className="text-lg leading-relaxed text-neutral-300 md:text-xl">
								I am currently working on{" "}
								<span className="font-medium text-cyan-300">BossAI</span>, an AI
								dictation tool with command mode. It makes voice a faster input
								layer for writing, and lets you hold a shortcut, speak, and
								insert an AI response directly where your cursor is.
							</p>

							<a
								href="https://bossai.tech"
								target="_blank"
								rel="noopener noreferrer"
								className="mt-7 inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-cyan-300 transition-colors hover:border-cyan-400/60 hover:text-white"
							>
								Visit bossai.tech
								<ExternalLink size={14} aria-hidden="true" />
							</a>
						</motion.div>

						<motion.div variants={itemVariants} className="grid gap-6">
							<div>
								<p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
									Available on
								</p>
								<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
									{platforms.map(({ name, Icon, iconClassName }) => (
										<div
											key={name}
											className="flex min-h-14 items-center gap-3 border border-cyan-500/15 bg-cyan-500/[0.04] px-3"
										>
											<Icon
												className={`shrink-0 ${iconClassName ?? "h-4 w-4 text-cyan-300"}`}
												aria-hidden="true"
											/>
											<span className="font-mono text-xs uppercase tracking-wider text-neutral-200">
												{name}
											</span>
										</div>
									))}
								</div>
							</div>

							<div className="grid gap-3 sm:grid-cols-2">
								{productModes.map(({ title, description, Icon }) => (
									<div
										key={title}
										className="grid grid-cols-[2.75rem_1fr] gap-4 border border-white/10 bg-white/[0.025] p-4"
									>
										<div className="flex h-11 w-11 items-center justify-center border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
											<Icon size={20} aria-hidden="true" />
										</div>
										<div>
											<h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
												{title}
											</h4>
											<p className="mt-2 text-sm leading-relaxed text-neutral-400">
												{description}
											</p>
										</div>
									</div>
								))}
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
