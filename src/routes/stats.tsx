import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Activity as ActivityIcon,
	Briefcase,
	Code,
	Github,
	Users,
	Flame,
	Zap,
	Star,
	GitFork,
} from "lucide-react";
import { projects } from "../data/projects";
import { getGithubStats } from "../functions/get-github-stats";

// --- Types ---

interface Activity {
	date: string;
	count: number;
	countPersonal: number;
	countWork: number;
	level: number;
}

interface WakapiData {
	coding_time_text: string;
	daily_average_text: string;
	languages?: Array<{ name: string; percent: number; text: string; color?: string }>;
	editors?: Array<{ name: string; percent: number; text: string }>;
}

interface GitHubData {
	public_repos: number;
	followers: number;
	total_stars: number;
	total_forks: number;
	longest_streak: number;
	current_streak: number;
	contributions: Activity[];
	languages: Array<{ name: string; size: number; percent: number }>;
}

interface LoaderData {
	wakapi: WakapiData | null;
	github: GitHubData | null;
}

// --- Custom Contribution Graph Component ---

function ContributionGraph({ data }: { data: Activity[] }) {
	const [hoveredDay, setHoveredDay] = useState<Activity | null>(null);
	const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

	// Cyan/blue color scheme matching the website
	const getColor = (level: number) => {
		const colors = [
			'rgba(6, 182, 212, 0.1)',   // Level 0 - very faint cyan
			'rgba(6, 182, 212, 0.3)',   // Level 1
			'rgba(6, 182, 212, 0.5)',   // Level 2
			'rgba(6, 182, 212, 0.7)',   // Level 3
			'rgba(6, 182, 212, 1)',     // Level 4 - full cyan
		];
		return colors[level] || colors[0];
	};

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	};

	// Group data by weeks
	const weeks: Activity[][] = [];
	let currentWeek: Activity[] = [];

	// Pad the beginning to align with Sunday
	if (data.length > 0) {
		const firstDate = new Date(data[0].date);
		const dayOfWeek = firstDate.getDay();
		for (let i = 0; i < dayOfWeek; i++) {
			currentWeek.push({ date: '', count: -1, countPersonal: 0, countWork: 0, level: -1 });
		}
	}

	data.forEach((day) => {
		currentWeek.push(day);
		if (currentWeek.length === 7) {
			weeks.push(currentWeek);
			currentWeek = [];
		}
	});

	if (currentWeek.length > 0) {
		weeks.push(currentWeek);
	}

	// Get month labels
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const monthLabels: { label: string; weekIndex: number }[] = [];
	let lastMonth = -1;

	weeks.forEach((week, weekIndex) => {
		const validDay = week.find(d => d.date);
		if (validDay) {
			const month = new Date(validDay.date).getMonth();
			if (month !== lastMonth) {
				monthLabels.push({ label: months[month], weekIndex });
				lastMonth = month;
			}
		}
	});

	const handleMouseEnter = (day: Activity, e: React.MouseEvent) => {
		if (day.count >= 0) {
			const rect = e.currentTarget.getBoundingClientRect();
			const containerRect = e.currentTarget.closest('.contribution-container')?.getBoundingClientRect();
			if (containerRect) {
				setTooltipPos({
					x: rect.left - containerRect.left + rect.width / 2,
					y: rect.top - containerRect.top - 8
				});
			}
			setHoveredDay(day);
		}
	};

	const totalContributions = data.reduce((sum, d) => sum + d.count, 0);

	return (
		<div className="contribution-container relative w-full">
			{/* Month labels - positioned using percentages for full width */}
			<div className="relative h-5 mb-2 ml-10">
				{monthLabels.map((m, i) => (
					<div
						key={i}
						className="absolute text-xs text-neutral-500"
						style={{ left: `${(m.weekIndex / weeks.length) * 100}%` }}
					>
						{m.label}
					</div>
				))}
			</div>

			<div className="flex gap-[2px] w-full mt-6">
				{/* Day labels - aligned with rows */}
				<div className="grid grid-rows-7 gap-[2px] text-xs text-neutral-500 pr-2 text-right">
					<span /> {/* Sun */}
					<span className="flex items-center justify-end leading-none">Mon</span>
					<span /> {/* Tue */}
					<span className="flex items-center justify-end leading-none">Wed</span>
					<span /> {/* Thu */}
					<span className="flex items-center justify-end leading-none">Fri</span>
					<span /> {/* Sat */}
				</div>

				{/* Grid - flex-1 to fill remaining width, min-w-0 to prevent overflow */}
				<div className="flex-1 min-w-0 grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
					{weeks.map((week, weekIndex) => (
						<div key={weekIndex} className="grid grid-rows-7 gap-[2px]">
							{week.map((day, dayIndex) => (
								<motion.div
									key={`${weekIndex}-${dayIndex}`}
									className="aspect-square rounded-sm cursor-pointer border border-white/5"
									style={{
										backgroundColor: day.count >= 0 ? getColor(day.level) : 'transparent',
										borderColor: day.count >= 0 ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
									}}
									whileHover={day.count >= 0 ? { scale: 1.2, borderColor: 'rgba(6, 182, 212, 0.8)' } : {}}
									onMouseEnter={(e) => handleMouseEnter(day, e)}
									onMouseLeave={() => setHoveredDay(null)}
								/>
							))}
						</div>
					))}
				</div>
			</div>

			{/* Legend */}
			<div className="flex items-center gap-2 mt-4 text-xs text-neutral-500">
				<span>Less</span>
				{[0, 1, 2, 3, 4].map((level) => (
					<div
						key={level}
						className="w-3 h-3 rounded-sm border border-cyan-500/20"
						style={{ backgroundColor: getColor(level) }}
					/>
				))}
				<span>More</span>
				<span className="ml-auto text-neutral-400">
					{totalContributions.toLocaleString()} contributions in the last year
				</span>
			</div>

			{/* Tooltip */}
			<AnimatePresence>
				{hoveredDay && (
					<motion.div
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 5 }}
						className="absolute z-50 pointer-events-none"
						style={{
							left: tooltipPos.x,
							top: tooltipPos.y,
							transform: 'translate(-50%, -100%)'
						}}
					>
						<div className="bg-neutral-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2 shadow-xl shadow-cyan-500/10 min-w-[140px]">
							<div className="text-cyan-400 font-semibold text-sm mb-2 border-b border-white/10 pb-1">
								{hoveredDay.count} Contribution{hoveredDay.count !== 1 ? 's' : ''}
							</div>

							<div className="space-y-1 mb-2">
								<div className="flex justify-between items-center text-xs">
									<span className="text-neutral-400">Personal</span>
									<span className="text-white font-mono">{hoveredDay.countPersonal}</span>
								</div>
								<div className="flex justify-between items-center text-xs">
									<span className="text-neutral-400">Work</span>
									<span className="text-white font-mono">{hoveredDay.countWork}</span>
								</div>
							</div>

							<div className="text-neutral-500 text-[10px] uppercase tracking-wider">
								{formatDate(hoveredDay.date)}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

// --- Loader ---
import { getWakapiStats } from "../functions/get-wakapi-stats";

export const Route = createFileRoute("/stats")({
	component: Stats,
	loader: async (): Promise<LoaderData> => {
		// 1. Fetch Data (Parallel)
		const [wakapi, user1Res, user2Res, contrib1Res, contrib2Res, secureStats1, secureStats2] = await Promise.all([
			getWakapiStats(),
			fetch("https://api.github.com/users/notnotrachit"),
			fetch("https://api.github.com/users/rachitk-ht"),
			fetch("https://github-contributions-api.jogruber.de/v4/notnotrachit?y=last"),
			fetch("https://github-contributions-api.jogruber.de/v4/rachitk-ht?y=last"),
			getGithubStats({ data: "notnotrachit" }),
			getGithubStats({ data: "rachitk-ht" })
		]);

		// 2. Process GitHub User & Contribution Data (Public)

		let github: GitHubData | null = null;

		const user1 = user1Res.ok ? await user1Res.json() : { public_repos: 0, followers: 0 };
		const user2 = user2Res.ok ? await user2Res.json() : { public_repos: 0, followers: 0 };
		const contrib1 = contrib1Res.ok ? await contrib1Res.json() : { contributions: [] };
		const contrib2 = contrib2Res.ok ? await contrib2Res.json() : { contributions: [] };

		// --- Merge Contributions & Calculate Streaks ---
		const contributionMap = new Map<string, { total: number; personal: number; work: number }>();

		const processContribs = (list: any[], type: 'personal' | 'work') => {
			list.forEach((c: any) => {
				const existing = contributionMap.get(c.date) || { total: 0, personal: 0, work: 0 };
				contributionMap.set(c.date, {
					total: existing.total + c.count,
					personal: existing.personal + (type === 'personal' ? c.count : 0),
					work: existing.work + (type === 'work' ? c.count : 0)
				});
			});
		};

		processContribs(contrib1.contributions || [], 'personal');
		processContribs(contrib2.contributions || [], 'work');

		let maxCount = 0;
		contributionMap.forEach(val => {
			if (val.total > maxCount) maxCount = val.total;
		});

		// Sort by date for proper graph & streak calc
		const sortedEntries = Array.from(contributionMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

		// Streaks Calc
		let currentStreak = 0;
		let longestStreak = 0;
		let tempStreak = 0;

		// Longest Streak
		sortedEntries.forEach(([_, stats]) => {
			if (stats.total > 0) {
				tempStreak++;
			} else {
				if (tempStreak > longestStreak) longestStreak = tempStreak;
				tempStreak = 0;
			}
		});
		if (tempStreak > longestStreak) longestStreak = tempStreak; // Check final streak if loop ends with active streak

		// Current Streak (iterate backwards)
		const today = new Date().toISOString().split('T')[0];
		let foundContributionTodayOrYesterday = false; // Flag to handle today's potential zero contributions
		for (let i = sortedEntries.length - 1; i >= 0; i--) {
			const [date, stats] = sortedEntries[i];

			if (stats.total > 0) {
				currentStreak++;
				foundContributionTodayOrYesterday = true;
			} else {
				// If it's today and no contributions yet, we can potentially still be in a streak
				// if yesterday had contributions.
				// If we already had contributions (e.g., yesterday), then today's 0 breaks it.
				if (date === today) {
					if (foundContributionTodayOrYesterday) {
						break; // Streak broken by today's zero
					}
				} else {
					break; // Streak broken by a past zero-contribution day
				}
			}
		}


		const mergedContributions: Activity[] = sortedEntries.map(([date, stats]) => {
			let level = 0;
			if (stats.total > 0 && maxCount > 0) {
				const ratio = stats.total / maxCount;
				if (ratio < 0.25) level = 1;
				else if (ratio < 0.5) level = 2;
				else if (ratio < 0.75) level = 3;
				else level = 4;
			}
			return {
				date,
				count: stats.total,
				countPersonal: stats.personal,
				countWork: stats.work,
				level
			};
		});

		// Merge Secure Stats
		const totalStars = (secureStats1?.totalStars || 0) + (secureStats2?.totalStars || 0);
		const totalForks = (secureStats1?.totalForks || 0) + (secureStats2?.totalForks || 0);

		const langMap = new Map<string, { size: number; color: string }>();
		[...(secureStats1?.languages || []), ...(secureStats2?.languages || [])].forEach(l => {
			const current = langMap.get(l.name) || { size: 0, color: l.color || "" };
			langMap.set(l.name, { size: current.size + l.size, color: l.color || current.color });
		});

		const totalSize = Array.from(langMap.values()).reduce((acc, val) => acc + val.size, 0);
		const mergedLanguages = Array.from(langMap.entries())
			.map(([name, { size, color }]) => ({
				name,
				size,
				percent: totalSize > 0 ? parseFloat(((size / totalSize) * 100).toFixed(2)) : 0
			}))
			.sort((a, b) => b.size - a.size)
			.slice(0, 5);

		github = {
			public_repos: (user1.public_repos || 0) + (user2.public_repos || 0),
			followers: (user1.followers || 0) + (user2.followers || 0),
			total_stars: totalStars,
			total_forks: totalForks,
			longest_streak: longestStreak,
			current_streak: currentStreak,
			contributions: mergedContributions,
			languages: mergedLanguages
		};

		return { wakapi, github };
	},
});

function Stats() {
	const { wakapi, github } = Route.useLoaderData();

	// Process Languages: Filter unknown, Merge TSX->TS, JSX->JS
	const processedLanguages = (() => {
		if (!wakapi?.languages) return [];
		const map = new Map<string, { percent: number; color?: string }>();

		wakapi.languages.forEach(l => {
			if (l.name.toLowerCase() === 'unknown') return;

			let name = l.name;
			if (name === 'TSX') name = 'TypeScript';
			if (name === 'JSX') name = 'JavaScript';

			const current = map.get(name);
			if (current) {
				current.percent += l.percent;
				current.percent = parseFloat(current.percent.toFixed(2));
			} else {
				map.set(name, { percent: l.percent, color: l.color });
			}
		});

		return Array.from(map.entries())
			.map(([name, val]) => ({ name, ...val }))
			.sort((a, b) => b.percent - a.percent)
			.slice(0, 5);
	})();
	const totalProjects = projects.length;

	const stats = [
		{
			label: "Projects Shipped",
			value: totalProjects + (github?.public_repos || 0),
			icon: Code,
			color: "text-cyan-400",
		},
		{
			label: "Coding Time (Last 7 Days)",
			value: wakapi?.coding_time_text || "Unknown",
			icon: Briefcase,
			color: "text-emerald-400"
		},
		{
			label: "Total Contributions",
			value: github?.contributions.reduce((acc, curr) => acc + curr.count, 0) || 0,
			icon: ActivityIcon,
			color: "text-purple-400"
		},
		{
			label: "GitHub Followers",
			value: github?.followers || 0,
			icon: Users,
			color: "text-pink-400"
		}
	];

	const getLangColor = (lang: string) => {
		const colors: Record<string, string> = {
			TypeScript: "#3178c6",
			JavaScript: "#f7df1e",
			Swift: "#F05138",
			Python: "#3776ab",
			HTML: "#e34c26",
			CSS: "#563d7c",
			Vue: "#41b883",
			Go: "#00ADD8",
			Rust: "#dea584",

			// Added colors
			JSX: "#61dafb",
			TSX: "#3178c6",
			React: "#61dafb",
			Markdown: "#ffffff",
			"Jupyter Notebook": "#DA5B0B",
			Shell: "#89e051",
			Bash: "#4EAA25",
			Zsh: "#89e051",
			C: "#555555",
			"C++": "#f34b7d",
			"C#": "#178600",
			Java: "#b07219",
			Kotlin: "#A97BFF",
			PHP: "#4F5D95",
			Ruby: "#701516",
			Lua: "#000080",
			SQL: "#e38c00",
			Io: "#a9188d",
			Dart: "#00B4AB",
			Svelte: "#ff3e00",
			Elixir: "#6e4a7e",
			Haskell: "#5e5086",
			Julia: "#a270ba",
			Perl: "#0298c3",
			Scala: "#c22d40",
			R: "#198ce7",
			Dockerfile: "#384d54",
			Makefile: "#427819",
			JSON: "#292929",
			YAML: "#cb171e",

			// Frameworks/Others
			"Vue.js": "#41b883",
			"React.js": "#61dafb",
			unknown: "#333333"
		};
		return colors[lang] || "#333333";
	};

	return (
		<main className="w-full min-h-screen bg-[#020617] pt-32 pb-20 px-4 md:px-8 selection:bg-cyan-500/30 selection:text-white">
			{/* Background Elements */}
			<div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
				<div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
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
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
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
						learning path. Powered by Wakapi & GitHub.
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
							<div className={`p-3 bg-white/5 rounded-xl w-fit mb-4 ${stat.color}`}>
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

				{/* GitHub Calendar & Activity */}
				<motion.section
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="mb-20"
				>
					<h2 className="font-display text-3xl text-white mb-8 flex items-center gap-4">
						<Github className="text-white" />
						Code Contributions
					</h2>
					<div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl">
						<div className="w-full">
							{github?.contributions && github.contributions.length > 0 ? (
								<ContributionGraph data={github.contributions} />
							) : (
								<div className="h-[144px] w-full flex items-center justify-center text-neutral-500">
									Loading contributions...
								</div>
							)}
						</div>
					</div>
				</motion.section>

				{/* Languages & GitHub Stats */}
				{github?.languages && github.languages.length > 0 && (
					<motion.section
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.35 }}
						className="mb-20"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{/* Languages */}
							<div className="flex flex-col gap-4">
								<h2 className="font-display text-3xl text-white mb-4 flex items-center gap-4">
									<Code className="text-cyan-400" />
									Top Languages
								</h2>
								{wakapi?.languages
									?.filter(l => l.name.toLowerCase() !== "unknown")
									.slice(0, 5)
									.map((lang) => (
										<div key={lang.name} className="relative group">
											<div className="flex justify-between text-sm mb-1">
												<span className="text-white font-bold">{lang.name}</span>
												<span className="text-neutral-400">{lang.percent}%</span>
											</div>
											<div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
												<motion.div
													initial={{ width: 0 }}
													animate={{ width: `${lang.percent}%` }}
													transition={{ duration: 1, delay: 0.5 }}
													className="h-full rounded-full"
													style={{ backgroundColor: lang.color || getLangColor(lang.name) }}
												/>
											</div>
										</div>
									))}
							</div>

							{/* GitHub Stats Grid */}
							<div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
								<h3 className="text-xl font-bold text-white mb-6">GitHub Performance</h3>
								<div className="grid grid-cols-2 gap-4">
									<div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
										<Flame className="text-orange-500 mb-2" size={24} />
										<div className="text-2xl font-bold text-white">{github.longest_streak}</div>
										<div className="text-xs text-neutral-400 uppercase tracking-wider">Longest Streak</div>
									</div>
									<div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
										<Zap className="text-yellow-400 mb-2" size={24} />
										<div className="text-2xl font-bold text-white">{github.current_streak}</div>
										<div className="text-xs text-neutral-400 uppercase tracking-wider">Current Streak</div>
									</div>
									<div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
										<Star className="text-yellow-500 mb-2" size={24} />
										<div className="text-2xl font-bold text-white">{github.total_stars}</div>
										<div className="text-xs text-neutral-400 uppercase tracking-wider">Total Stars</div>
									</div>
									<div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
										<GitFork className="text-purple-500 mb-2" size={24} />
										<div className="text-2xl font-bold text-white">{github.total_forks}</div>
										<div className="text-xs text-neutral-400 uppercase tracking-wider">Total Forks</div>
									</div>
								</div>
							</div>
						</div>
					</motion.section>
				)}
			</div>
		</main>
	);
}
