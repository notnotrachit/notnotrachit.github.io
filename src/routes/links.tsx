
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
    FaTwitter,
    FaGithub,
    FaLinkedin,
    FaMastodon,
    FaAt,
    FaInstagram,
    FaSnapchat,
    FaDev,
    FaDiscord,
    FaTelegram,
    FaReddit,
    FaGlobe,
    FaSpotify,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { SiHashnode, SiKofi, SiBuymeacoffee } from "react-icons/si";
import { BsMedium } from "react-icons/bs";
// import { BackgroundParallax } from "../components/ui/BackgroundParallax";

export const Route = createFileRoute("/links")({
    component: LinksPage,
});

function LinksPage() {
    const links = [
        { href: "/", icon: FaGlobe, label: "Portfolio website", color: "hover:text-cyan-400" },
        { href: "https://github.com/notnotrachit", icon: FaGithub, label: "GitHub", color: "hover:text-white" },
        { href: "https://x.com/notnotrachit", icon: FaSquareXTwitter, label: "X (Twitter)", color: "hover:text-white" },
        { href: "https://www.threads.net/@notnotrachit", icon: FaAt, label: "Threads", color: "hover:text-white" }, // Using FaAt as placeholder for Threads if icon not found or SVG
        { href: "https://www.linkedin.com/in/rachitkhurana1", icon: FaLinkedin, label: "LinkedIn", color: "hover:text-blue-500" },
        { href: "https://mastodon.social/@notnotrachit", icon: FaMastodon, label: "Mastodon", color: "hover:text-purple-500" },
        { href: "https://bsky.app/profile/notnotrachit.bsky.social", icon: FaAt, label: "BlueSky", color: "hover:text-blue-400" }, // Using FaAt/Text for now
        { href: "mailto:notnotrachit@gmail.com", icon: MdEmail, label: "Email", color: "hover:text-red-400" },
        { href: "https://instagram.com/notnotrachit", icon: FaInstagram, label: "Instagram", color: "hover:text-pink-500" },
        { href: "https://www.snapchat.com/add/notnotrachit", icon: FaSnapchat, label: "Snapchat", color: "hover:text-yellow-400" },
        { href: "https://open.spotify.com/user/ia2267ov7v3cs2923ecnxpqoe", icon: FaSpotify, label: "Spotify", color: "hover:text-green-500" },
        { href: "https://discordapp.com/users/744224056966119565", icon: FaDiscord, label: "Discord", color: "hover:text-indigo-400" },
        { href: "https://t.me/dilutewater", icon: FaTelegram, label: "Telegram", color: "hover:text-blue-400" },
        { href: "https://www.reddit.com/user/rachitkhurana", icon: FaReddit, label: "Reddit", color: "hover:text-orange-500" },
        { href: "https://dev.to/dilutewater", icon: FaDev, label: "Dev.to", color: "hover:text-white" },
        { href: "https://blog.rachitkhurana.tech", icon: SiHashnode, label: "Hashnode", color: "hover:text-blue-600" },
        { href: "https://medium.com/@dilutewater", icon: BsMedium, label: "Medium", color: "hover:text-white" },
        { href: "https://ko-fi.com/rachitkhurana", icon: SiKofi, label: "Ko-Fi", color: "hover:text-pink-400" },
        { href: "https://www.buymeacoffee.com/notnotrachit", icon: SiBuymeacoffee, label: "Buy Me a Coffee", color: "hover:text-yellow-500" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <main className="w-full min-h-screen bg-transparent selection:bg-cyan-500/30 selection:text-white overflow-x-hidden relative flex flex-col items-center py-20">
            {/* Static Background Grid */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="z-10 w-full max-w-4xl px-4 flex flex-col items-center">
                {/* Profile Section */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 relative group"
                >
                    <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" />
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20">
                        <img
                            src="/profile.jpg"
                            alt="Rachit Khurana"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl font-display font-bold text-white mb-2 text-center"
                >
                    Rachit Khurana
                </motion.h1>
                <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-neutral-400 text-lg mb-12 text-center"
                >
                    Code. Coffee. Create.
                </motion.p>

                {/* Links Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap justify-center gap-4 w-full"
                >
                    {links.map((link) => (
                        <motion.a
                            key={link.label}
                            variants={itemVariants}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 flex items-center justify-center hover:z-50"
                            aria-label={link.label}
                        >
                            <link.icon className={`text-3xl md:text-4xl text-neutral-300 transition-colors duration-300 ${link.color}`} />

                            {/* Tooltip */}
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {link.label}
                            </span>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Other Links Section - Explicitly keeping it simple as requested, effectively merged generally */}
                {/* User said "no need for other links section", so assuming just the icons is what they want, based on the grid layout in the image. */}

            </div>
        </main>
    );
}
