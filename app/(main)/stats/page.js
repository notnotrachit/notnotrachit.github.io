"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    FaGithub, FaCode, FaClock, FaCalendarAlt, FaStar,
    FaCodeBranch, FaUsers, FaArrowLeft, FaLaptopCode,
    FaChartBar, FaFire
} from "react-icons/fa";
import { SiJavascript, SiPython, SiTypescript, SiGo, SiReact } from "react-icons/si";

// Dynamic import for SSR compatibility
const GitHubCalendar = dynamic(() => import("react-github-calendar"), { ssr: false });

// Language icon mapping
const languageIcons = {
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    Python: SiPython,
    Go: SiGo,
    React: SiReact,
};

const SectionHeader = ({ title, icon: Icon }) => (
    <div className="flex items-center gap-3 mb-8">
        <Icon className="text-primary text-2xl" />
        <h2 className="text-2xl font-bold">{title}</h2>
    </div>
);

const StatCard = ({ icon: Icon, label, value, subtext }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-2xl flex flex-col items-center text-center gap-2 hover:border-primary/40 transition-colors"
    >
        <Icon className="text-primary text-3xl mb-2" />
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-muted-foreground text-sm">{label}</p>
        {subtext && <p className="text-xs text-primary/70">{subtext}</p>}
    </motion.div>
);

const LanguageBar = ({ name, percent, hours, color }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-sm">
            <span className="font-medium">{name}</span>
            <span className="text-muted-foreground">{hours} • {percent}%</span>
        </div>
        <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
            />
        </div>
    </div>
);

export default function StatsPage() {
    const [wakaData, setWakaData] = useState(null);
    const [githubData, setGithubData] = useState(null);
    const [contribData, setContribData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch stats in parallel (including both GitHub accounts)
                const [wakaResult, github1Result, github2Result, contrib1Result, contrib2Result] = await Promise.allSettled([
                    fetch("/api/wakapi"),
                    fetch("https://api.github.com/users/notnotrachit"),
                    fetch("https://api.github.com/users/rachitk-ht"),
                    fetch("https://github-contributions-api.jogruber.de/v4/notnotrachit?y=last"),
                    fetch("https://github-contributions-api.jogruber.de/v4/rachitk-ht?y=last")
                ]);

                // Handle Wakapi result
                if (wakaResult.status === "fulfilled" && wakaResult.value.ok) {
                    try {
                        const wakaJson = await wakaResult.value.json();
                        console.log("Wakapi JSON:", wakaJson);
                        setWakaData(wakaJson);
                    } catch (e) {
                        console.error("Error parsing Wakapi data:", e);
                    }
                } else {
                    console.error("Wakapi fetch failed:", wakaResult);
                }

                // Handle GitHub results - combine both accounts
                let combinedGithub = { public_repos: 0, followers: 0, following: 0, public_gists: 0 };
                if (github1Result.status === "fulfilled" && github1Result.value.ok) {
                    const g1 = await github1Result.value.json();
                    combinedGithub.public_repos += g1.public_repos || 0;
                    combinedGithub.followers += g1.followers || 0;
                    combinedGithub.following += g1.following || 0;
                    combinedGithub.public_gists += g1.public_gists || 0;
                }
                if (github2Result.status === "fulfilled" && github2Result.value.ok) {
                    const g2 = await github2Result.value.json();
                    combinedGithub.public_repos += g2.public_repos || 0;
                    combinedGithub.followers += g2.followers || 0;
                    combinedGithub.following += g2.following || 0;
                    combinedGithub.public_gists += g2.public_gists || 0;
                }
                setGithubData(combinedGithub);

                // Handle Contribution results - merge by date with separate tracking
                let combinedContrib = { total: { lastYear: 0, personal: 0, work: 0 }, contributions: [] };
                const contribMap = {};

                const processContrib = async (result, accountType) => {
                    if (result.status === "fulfilled" && result.value.ok) {
                        const data = await result.value.json();
                        if (accountType === 'personal') {
                            combinedContrib.total.personal += data.total?.lastYear || 0;
                        } else {
                            combinedContrib.total.work += data.total?.lastYear || 0;
                        }
                        combinedContrib.total.lastYear += data.total?.lastYear || 0;
                        data.contributions?.forEach(c => {
                            if (!contribMap[c.date]) {
                                contribMap[c.date] = { date: c.date, count: 0, personal: 0, work: 0 };
                            }
                            contribMap[c.date].count += c.count;
                            if (accountType === 'personal') {
                                contribMap[c.date].personal += c.count;
                            } else {
                                contribMap[c.date].work += c.count;
                            }
                        });
                    }
                };

                await processContrib(contrib1Result, 'personal');
                await processContrib(contrib2Result, 'work');
                combinedContrib.contributions = Object.values(contribMap).sort((a, b) => a.date.localeCompare(b.date));
                setContribData(combinedContrib);

            } catch (error) {
                console.error("Error in fetch orchestration:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatTime = (seconds) => {
        if (!seconds) return "0h 0m";
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    const getTotalSeconds = () => {
        // Handle aggregated summary structure
        if (!wakaData?.languages) {
            console.log("getTotalSeconds: No languages data", wakaData);
            return 0;
        }
        const total = wakaData.languages.reduce((acc, lang) => acc + (lang.total || 0), 0);
        console.log("getTotalSeconds: Calculated total", total);
        return total;
    };

    const getLanguages = () => {
        // Handle aggregated summary structure
        if (!wakaData?.languages) return [];

        const langItems = wakaData.languages.map(lang => ({
            name: lang.key,
            seconds: lang.total || 0
        }));

        const total = langItems.reduce((a, b) => a + b.seconds, 0);

        return langItems
            .map(item => ({
                ...item,
                percent: total > 0 ? ((item.seconds / total) * 100).toFixed(1) : 0,
                hours: formatTime(item.seconds),
            }))
            .sort((a, b) => b.seconds - a.seconds)
            .slice(0, 6);
    };

    const languageColors = {
        JavaScript: "#f7df1e",
        TypeScript: "#3178c6",
        Python: "#3776ab",
        Go: "#00add8",
        CSS: "#264de4",
        HTML: "#e34c26",
        Java: "#b07219",
        Rust: "#dea584",
        "C++": "#f34b7d",
        Swift: "#F05138",
        JSX: "#61dafb",
        TSX: "#3178c6",
        Markdown: "#083fa1",
        JSON: "#292929",
        TOML: "#9c4221",
        YAML: "#cb171e",
        Bash: "#89e051",
        "shell script": "#89e051",
        Ruby: "#701516",
        PHP: "#4F5D95",
        Kotlin: "#A97BFF",
        Dart: "#00B4AB",
        Vue: "#41b883",
        Svelte: "#ff3e00",
        Scss: "#c6538c",
        Sass: "#a53b70",
        Less: "#1d365d",
        SQL: "#e38c00",
        GraphQL: "#e10098",
        C: "#555555",
        "C#": "#178600",
        "Objective-C": "#438eff",
        Lua: "#000080",
        Perl: "#0298c3",
        R: "#198CE7",
        Scala: "#c22d40",
        Elixir: "#6e4a7e",
        Haskell: "#5e5086",
        unknown: "#6b7280",
        default: "#a78bfa",
    };

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-muted-foreground">Loading stats...</p>
                </div>
            </main>
        );
    }

    const totalSeconds = getTotalSeconds();
    const languages = getLanguages();
    const dailyAvg = totalSeconds ? formatTime(totalSeconds / 7) : "0h 0m";

    return (
        <main className="min-h-screen py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-6xl space-y-16">
            {/* Background Glow */}
            <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10" />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 mb-4">
                        <FaArrowLeft /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold glow-text">Coding Stats</h1>
                    <p className="text-muted-foreground mt-2">Real-time coding activity and GitHub statistics</p>
                </div>
                <div className="flex gap-4">
                    <a href="https://github.com/notnotrachit" target="_blank" className="glass px-4 py-2 rounded-lg flex items-center gap-2 hover:border-primary/40 transition-colors">
                        <FaGithub /> GitHub Profile
                    </a>
                </div>
            </div>

            {/* Coding Time Stats */}
            <section>
                <SectionHeader title="Coding Activity (Last 7 Days)" icon={FaClock} />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <StatCard
                        icon={FaCode}
                        label="Total Coding Time"
                        value={formatTime(totalSeconds)}
                    />
                    <StatCard
                        icon={FaLaptopCode}
                        label="Top Editor"
                        value={wakaData?.editors?.[0]?.key || "—"}
                        subtext={wakaData?.editors?.[0] ? formatTime(wakaData.editors[0].total) : null}
                    />
                    <StatCard
                        icon={FaChartBar}
                        label="Languages Used"
                        value={languages.length}
                    />
                    <StatCard
                        icon={FaFire}
                        label="Projects Active"
                        value={wakaData?.projects?.length || 0}
                    />
                </div>
            </section>

            {/* Languages Breakdown */}
            <section>
                <SectionHeader title="Languages" icon={FaChartBar} />
                <div className="glass p-8 rounded-2xl space-y-6">
                    {languages.length > 0 ? (
                        languages.map((lang, i) => (
                            <LanguageBar
                                key={i}
                                name={lang.name}
                                percent={lang.percent}
                                hours={lang.hours}
                                color={languageColors[lang.name] || languageColors.default}
                            />
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground">No language data available</p>
                    )}
                </div>
            </section>

            {/* GitHub Stats */}
            <section>
                <SectionHeader title="GitHub Overview" icon={FaGithub} />
                <p className="text-sm text-muted-foreground mb-6 -mt-4">
                    Combined stats from personal (<span className="text-purple-400">@notnotrachit</span>) and work accounts.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    {/* Basic Profile Stats */}
                    {githubData && (
                        <>
                            <StatCard
                                icon={FaCodeBranch}
                                label="Public Repos"
                                value={githubData.public_repos}
                            />
                            <StatCard
                                icon={FaUsers}
                                label="Followers"
                                value={githubData.followers}
                            />
                        </>
                    )}

                    {/* Contribution Stats */}
                    {contribData?.total && (
                        <>
                            <StatCard
                                icon={FaFire}
                                label="Contributions"
                                value={contribData.total.lastYear}
                                subtext="in the last year"
                            />
                            <StatCard
                                icon={FaChartBar}
                                label="Best Day"
                                value={Math.max(...contribData.contributions.map(c => c.count))}
                                subtext="commits in one day"
                            />
                        </>
                    )}
                </div>

                {githubData && contribData && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatCard
                            icon={FaUsers}
                            label="Following"
                            value={githubData.following}
                        />
                        <StatCard
                            icon={FaStar}
                            label="Public Gists"
                            value={githubData.public_gists}
                        />
                        <StatCard
                            icon={FaCalendarAlt}
                            label="Active Days"
                            value={contribData.contributions.filter(c => c.count > 0).length}
                            subtext="in last year"
                        />
                    </div>
                )}


                {/* GitHub Contribution Graph - Combined from both accounts */}
                <div className="mt-8 glass p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-2">Combined Contribution Graph</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                        {contribData?.total ? (
                            <>
                                <span className="text-white font-semibold">{contribData.total.lastYear}</span> contributions in the last year
                                <span className="mx-2">•</span>
                                <span className="text-purple-400">{contribData.total.personal}</span> personal
                                <span className="mx-2">•</span>
                                <span className="text-blue-400">{contribData.total.work}</span> work
                            </>
                        ) : 'Loading...'}
                    </p>
                    {contribData?.contributions?.length > 0 ? (() => {
                        const contributions = contribData.contributions.slice(-365);
                        const colors = ['#161b22', '#4c1d95', '#6d28d9', '#8b5cf6', '#c4b5fd'];
                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                        // Create a lookup map by date
                        const contribMap = {};
                        contributions.forEach(c => { contribMap[c.date] = c; });

                        // Find the start date (go back ~1 year) and find the previous Sunday
                        const endDate = new Date(contributions[contributions.length - 1]?.date || new Date());
                        const startDate = new Date(contributions[0]?.date || new Date());
                        // Adjust to previous Sunday
                        startDate.setDate(startDate.getDate() - startDate.getDay());

                        // Build weeks array (each week = 7 days starting Sunday)
                        const weeks = [];
                        let currentDate = new Date(startDate);
                        while (currentDate <= endDate) {
                            const week = [];
                            for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
                                const dateStr = currentDate.toISOString().split('T')[0];
                                week.push(contribMap[dateStr] || { date: dateStr, count: 0, personal: 0, work: 0 });
                                currentDate.setDate(currentDate.getDate() + 1);
                            }
                            weeks.push(week);
                        }

                        return (
                            <div className="w-full">
                                {/* Month labels */}
                                <div className="flex text-xs text-muted-foreground mb-2" style={{ paddingLeft: '36px' }}>
                                    {weeks.map((week, i) => {
                                        if (!week[0]) return <div key={i} className="flex-1" />;
                                        const date = new Date(week[0].date);
                                        const prevWeek = weeks[i - 1];
                                        const prevMonth = prevWeek?.[0] ? new Date(prevWeek[0].date).getMonth() : -1;
                                        if (date.getMonth() !== prevMonth) {
                                            return <div key={i} className="flex-1 text-left">{months[date.getMonth()]}</div>;
                                        }
                                        return <div key={i} className="flex-1" />;
                                    })}
                                </div>

                                <div className="flex">
                                    {/* Day labels */}
                                    <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2" style={{ width: '32px' }}>
                                        <span></span>
                                        <span className="text-[10px]">Mon</span>
                                        <span></span>
                                        <span className="text-[10px]">Wed</span>
                                        <span></span>
                                        <span className="text-[10px]">Fri</span>
                                        <span></span>
                                    </div>

                                    {/* Grid - fills remaining width */}
                                    <div className="flex-1 flex gap-[2px]">
                                        {weeks.map((week, wi) => (
                                            <div key={wi} className="flex-1 flex flex-col gap-[2px]">
                                                {[0, 1, 2, 3, 4, 5, 6].map(dayIdx => {
                                                    const day = week[dayIdx];
                                                    if (!day) return <div key={dayIdx} className="aspect-square rounded-sm" style={{ backgroundColor: '#161b22' }} />;
                                                    const level = day.count === 0 ? 0 : Math.min(4, Math.ceil(day.count / 3));
                                                    return (
                                                        <div
                                                            key={dayIdx}
                                                            className="group relative aspect-square rounded-sm cursor-pointer transition-all hover:ring-2 hover:ring-white/50 hover:z-10"
                                                            style={{ backgroundColor: colors[level] }}
                                                        >
                                                            {/* Custom Tooltip */}
                                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 whitespace-nowrap">
                                                                <div className="text-white font-semibold text-sm mb-1">
                                                                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                                                                </div>
                                                                <div className="text-gray-300 text-xs">
                                                                    <span className="font-medium text-white">{day.count}</span> contributions
                                                                </div>
                                                                <div className="flex gap-3 mt-1 text-xs">
                                                                    <span><span className="text-purple-400 font-medium">{day.personal || 0}</span> personal</span>
                                                                    <span><span className="text-blue-400 font-medium">{day.work || 0}</span> work</span>
                                                                </div>
                                                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-gray-900"></div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
                                    <span>Less</span>
                                    {colors.map((color, i) => (
                                        <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                                    ))}
                                    <span>More</span>
                                </div>
                            </div>
                        );
                    })() : (
                        <p className="text-center text-muted-foreground">Loading contribution data...</p>
                    )}
                </div>
            </section>
            {/* )} */}

            {/* Footer */}
            <footer className="pt-8 text-center text-sm text-muted-foreground border-t border-white/5">
                <p>Stats powered by <a href="https://wakapi.dev" target="_blank" className="text-primary hover:underline">Wakapi</a> & <a href="https://github.com" target="_blank" className="text-primary hover:underline">GitHub API</a></p>
            </footer>
        </main>
    );
}
