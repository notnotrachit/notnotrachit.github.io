import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
	Award,
	Briefcase,
	Calendar,
	Code,
	ExternalLink,
	Trophy,
} from "lucide-react";
import { achievements } from "../data/achievements";
import { certifications } from "../data/certifications";
import { projects } from "../data/projects";

export const Route = createFileRoute("/stats")({
	component: Stats,
});

function Stats() {
	// Calculate stats
	const totalProjects = projects.length;
	const totalAwards = achievements.length;
	const totalCerts = certifications.length;
	const yearsExperience = new Date().getFullYear() - 2022; // Approx start based on data

	const stats = [
		{
			label: "Projects Shipped",
			value: totalProjects,
			icon: Code,
			color: "text-blue-400",
		},
		{
			label: "Hackathon Wins",
			value: totalAwards,
			icon: Trophy,
			color: "text-yellow-400",
		},
		{
			label: "Certifications",
			value: totalCerts,
			icon: Award,
			color: "text-purple-400",
		},
		{
			label: "Years Exp.",
			value: `~${yearsExperience}`,
			icon: Briefcase,
			color: "text-green-400",
		},
	];

	return (
		<main className="w-full min-h-screen bg-[#0f0c29] pt-32 pb-20 px-4 md:px-8 selection:bg-indigo-500/30 selection:text-white">
			{/* Background Elements */}
			<div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
				<div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
			</div>

			<div className="max-w-[1200px] mx-auto relative z-10">
				{/* Header */}
				<div className="mb-16">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white mb-6"
					>
						Career{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
							Stats
						</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-neutral-400 text-lg max-w-2xl font-body leading-relaxed"
					>
						A quantitative look at my journey, achievements, and continuous
						learning path.
					</motion.p>
				</div>

				{/* Key Metrics Grid */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.1 + 0.2 }}
							className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors"
						>
							<div
								className={`p-3 bg-white/5 rounded-xl w-fit mb-4 ${stat.color}`}
							>
								<stat.icon size={24} />
							</div>
							<h3 className="font-display text-4xl font-bold text-white mb-1">
								{stat.value}
							</h3>
							<p className="font-mono text-sm text-neutral-400 uppercase tracking-wider">
								{stat.label}
							</p>
						</motion.div>
					))}
				</div>

				{/* Certifications Section */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="mb-20"
				>
					<h2 className="font-display text-3xl text-white mb-8 flex items-center gap-4">
						<Award className="text-indigo-400" />
						Certifications
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{certifications.map((cert) => (
							<a
								key={cert.id}
								href={cert.credentialUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all"
							>
								<div className="shrink-0 w-16 h-16 rounded-xl bg-white text-black flex items-center justify-center overflow-hidden">
									{cert.imageUrl ? (
										<img
											src={cert.imageUrl}
											alt={cert.issuingAuthority}
											className="w-full h-full object-contain p-2"
										/>
									) : (
										<Award />
									)}
								</div>
								<div className="flex-1 min-w-0">
									<h3 className="font-bold text-white text-lg leading-tight mb-2 group-hover:text-indigo-400 transition-colors truncate">
										{cert.name}
									</h3>
									<p className="text-neutral-400 text-sm mb-3">
										{cert.issuingAuthority}
									</p>
									<div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
										<span className="flex items-center gap-1">
											<Calendar size={12} />
											{new Date(cert.issuedOn).toLocaleDateString("en-US", {
												month: "short",
												year: "numeric",
											})}
										</span>
										{cert.verified && (
											<span className="text-green-400/80 bg-green-400/10 px-2 py-0.5 rounded-full">
												Verified
											</span>
										)}
									</div>
								</div>
								<ExternalLink
									className="text-neutral-600 group-hover:text-white transition-colors"
									size={20}
								/>
							</a>
						))}
					</div>
				</motion.section>

				{/* Detailed Achievements */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
				>
					<h2 className="font-display text-3xl text-white mb-8 flex items-center gap-4">
						<Trophy className="text-yellow-400" />
						Hackathon Victories
					</h2>
					<div className="grid grid-cols-1 gap-4">
						{achievements.map((achievement) => (
							<div
								key={achievement.id}
								className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-2xl"
							>
								<div className="w-full md:w-48 h-32 shrink-0 rounded-lg overflow-hidden bg-black/50 border border-white/10">
									<img
										src={achievement.image}
										alt={achievement.title}
										className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
										onError={(e) => {
											(e.target as HTMLImageElement).src =
												"https://via.placeholder.com/300x200/1a1a1a/ffffff?text=Hackathon";
										}}
									/>
								</div>
								<div className="flex-1 text-center md:text-left">
									<h3 className="font-display text-xl font-bold text-white mb-2">
										{achievement.title}
									</h3>
									<div className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-sm font-bold mb-4">
										{achievement.award}
									</div>
									{achievement.subAward && (
										<p className="text-neutral-400 text-sm mb-2 italic">
											"{achievement.subAward}"
										</p>
									)}
									{achievement.teammates && (
										<div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
											<span className="text-xs text-neutral-500 font-mono">
												with
											</span>
											{achievement.teammates.map((mate) => (
												<span
													key={mate}
													className="text-xs text-neutral-400 bg-white/5 px-2 py-1 rounded"
												>
													{mate}
												</span>
											))}
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</motion.section>
			</div>
		</main>
	);
}
