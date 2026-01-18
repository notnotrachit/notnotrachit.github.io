"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { X, Terminal } from "lucide-react";
import { useGravity } from "../../hooks/useGravity";
import { useEasterEggTriggers } from "./EasterEggs";
import { education } from "../../data/education";
import { projects } from "../../data/projects";

interface CommandHistory {
    command: string;
    output: string | JSX.Element;
}

export function CLITerminal() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<CommandHistory[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { triggerGravity } = useGravity();
    const { triggerConfetti } = useEasterEggTriggers();
    const dragControls = useDragControls();

    const commands: Record<string, (args: string[]) => string | JSX.Element> = {
        help: () => (
            <div className="flex flex-col gap-1 text-green-300">
                <p className="mb-2 text-white/90">Available commands:</p>
                <table className="table-auto w-full text-left">
                    <tbody>
                        <tr><td className="w-24 text-cyan-400">help</td><td className="text-white/60">Show this message</td></tr>
                        <tr><td className="text-cyan-400">about</td><td className="text-white/60">Who am I?</td></tr>
                        <tr><td className="text-cyan-400">projects</td><td className="text-white/60">View my work</td></tr>
                        <tr><td className="text-cyan-400">education</td><td className="text-white/60">My background</td></tr>
                        <tr><td className="text-cyan-400">ls</td><td className="text-white/60">List files</td></tr>
                        <tr><td className="text-cyan-400">pwd</td><td className="text-white/60">Print working directory</td></tr>
                        <tr><td className="text-cyan-400">whoami</td><td className="text-white/60">Display current user</td></tr>
                        <tr><td className="text-cyan-400">cat [file]</td><td className="text-white/60">Read a file</td></tr>
                        <tr><td className="text-cyan-400">clear</td><td className="text-white/60">Clear terminal</td></tr>
                        <tr><td className="text-purple-400">sudo hire</td><td className="text-white/60">Run hiring protocol</td></tr>
                        <tr><td className="text-red-500">rm -rf /</td><td className="text-white/60">Do not run this</td></tr>
                        <tr><td className="text-yellow-400">matrix</td><td className="text-white/60">Enter the matrix</td></tr>
                        <tr><td className="text-white/40">exit</td><td className="text-white/60">Close terminal</td></tr>
                    </tbody>
                </table>
            </div>
        ),
        about: () => (
            <div className="flex flex-col gap-2 max-w-lg">
                <p className="text-white/90 leading-relaxed">
                    Hi, I'm <span className="text-cyan-400 font-bold">Rachit</span>. I'm a Full Stack Developer and AI Enthusiast.
                    I love building things that live on the internet, from websites and applications to games and AI models.
                    Currently studying at <span className="text-yellow-200">Bennett University</span>.
                </p>
            </div>
        ),
        education: () => (
            <div className="flex flex-col gap-3">
                {education.map((edu) => (
                    <div key={edu.id} className="flex flex-col">
                        <div className="flex justify-between items-baseline">
                            <span className="text-cyan-400 font-bold">{edu.school}</span>
                            <span className="text-white/50 text-xs">{edu.period}</span>
                        </div>
                        <div className="text-white/80">{edu.degree}</div>
                        <div className="text-white/60 text-sm italic">{edu.details}</div>
                    </div>
                ))}
            </div>
        ),
        projects: () => (
            <div className="flex flex-col gap-4">
                <p className="text-white/70 italic">Showing top projects (type 'cat projects/[name]' for more details - just kidding, click the links):</p>
                {projects.filter(p => p.featured).slice(0, 5).map((project) => (
                    <div key={project.id} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-300 font-bold">{project.title}</span>
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-xs hover:underline">[GitHub]</a>
                            )}
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-green-400 text-xs hover:underline">[Live]</a>
                            )}
                        </div>
                        <p className="text-white/80 text-sm">{project.shortDescription}</p>
                        <div className="flex gap-2 text-xs text-white/50">
                            {project.techStack.map(t => <span key={t}>#{t}</span>)}
                        </div>
                    </div>
                ))}
                <p className="text-white/40 text-xs mt-2">...and many more. Visit the Projects section for full list.</p>
            </div>
        ),
        ls: () => (
            <div className="grid grid-cols-2 gap-2 text-green-400">
                <span>about.md</span>
                <span>skills.json</span>
                <span>projects/</span>
                <span>education.txt</span>
                <span>contact.txt</span>
                <span>resume.pdf</span>
                <span className="text-red-500">dont_open.txt</span>
            </div>
        ),
        pwd: () => "/home/visitor",
        whoami: () => "visitor@portfolio:~$",
        date: () => new Date().toString(),
        echo: (args) => args.join(" "),
        touch: (args) => args.length > 0 ? `Created file: ${args[0]}` : "usage: touch <filename>",
        mkdir: (args) => args.length > 0 ? `Created directory: ${args[0]}` : "usage: mkdir <dirname>",
        uname: () => "Linux portfolio-kernel 4.2.0-rachit-os x86_64",
        uptime: () => "up 1337 days, 42 min, 1 user, load average: 0.00, 0.01, 0.05",
        top: () => (
            <div className="flex flex-col text-xs font-mono text-green-300">
                <div className="border-b border-green-800 mb-1 pb-1">
                    PID USER      PR  NI  VIRT  RES  SHR S  %CPU %MEM    TIME+ COMMAND
                </div>
                <div> 1   root      20   0  1337M 420M  10M R  99.9  0.1   99:99  portfolio_v3</div>
                <div> 2   visitor   20   0   100M  10M   5M S   0.1  0.0   00:01  bash</div>
                <div> 3   rachit    20   0   500M 200M  50M S   1.0  0.1   12:34  coding_skills</div>
                <div> 4   system    20   0    50M   5M   1M S   0.0  0.0   00:00  init</div>
            </div>
        ),
        vi: () => "Error: User is stuck in vim forever. (Press Esc to panic)",
        vim: () => "Error: User is stuck in vim forever. (Press Esc to panic)",
        nano: () => "Real developers use butterflies. (But nano is fine too.)",
        clear: () => {
            setHistory([]);
            return "";
        },
        exit: () => {
            setIsOpen(false);
            return "Closing connection...";
        },
        sudo: (args) => {
            if (args[0] === "hire") {
                triggerConfetti();
                setTimeout(() => {
                    window.location.href = "mailto:notnotrachit@gmail.com?subject=Let's work together!";
                }, 1500);
                return "Initializing hiring protocol... 🎉";
            }
            return "Permission denied: try 'sudo hire'";
        },
        rm: (args) => {
            if (args[0] === "-rf" && args[1] === "/") {
                setTimeout(() => {
                    triggerGravity();
                    setIsOpen(false);
                }, 1000);
                return "CRITICAL ERROR: SYSTEM INTEGRITY COMPROMISED. INITIATING GRAVITY FAILURE...";
            }
            return "Usage: rm -rf /";
        },
        matrix: () => {
            return (
                <div className="text-green-500 font-matrix">
                    Wake up, Neo...
                    <br />
                    The Matrix has you...
                    <br />
                    Follow the white rabbit.
                </div>
            );
        },
        joke: () => {
            const jokes = [
                "Why do programmers prefer dark mode? Because light attracts bugs.",
                "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
                "I would tell you a UDP joke, but you might not get it.",
                "There are 10 types of people in the world: those who understand binary, and those who don't.",
                "My code doesn't work, I have no idea why. My code works, I have no idea why.",
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        },
        dice: () => `You rolled a ${Math.floor(Math.random() * 6) + 1} 🎲`,
        coinflip: () => Math.random() > 0.5 ? "Heads 🪙" : "Tails 🪙",
        cat: (args) => {
            const fileName = args[0];
            if (!fileName) return "usage: cat <filename>";

            switch (fileName) {
                case "about.md":
                    return (
                        <p className="text-white/90">
                            Hi, I'm <span className="text-cyan-400">Rachit</span>. I'm a Full Stack Developer and AI Enthusiast.
                            I love building things that live on the internet.
                        </p>
                    );
                case "skills.json":
                    return (
                        <pre className="text-xs text-yellow-200">
                            {JSON.stringify({
                                languages: ["Python", "JS/TS", "Java", "Go", "C++"],
                                frameworks: ["React", "Next.js", "Django", "FastAPI"],
                                tools: ["Git", "Docker", "AWS", "Linux"]
                            }, null, 2)}
                        </pre>
                    );
                case "education.txt":
                    return "Bennett University - BTech CSE (2022-2026)";
                case "contact.txt":
                    return (
                        <div className="flex flex-col gap-1 text-white/80">
                            <p>Email: <a href="mailto:notnotrachit@gmail.com" className="text-cyan-400 hover:underline">notnotrachit@gmail.com</a></p>
                            <p>GitHub: <a href="https://github.com/notnotrachit" className="text-cyan-400 hover:underline">github.com/notnotrachit</a></p>
                            <p>LinkedIn: <a href="https://linkedin.com/in/notnotrachit" className="text-cyan-400 hover:underline">linkedin.com/in/notnotrachit</a></p>
                        </div>
                    );
                case "resume.pdf":
                    window.open("/resume.pdf", "_blank");
                    return "Opening resume.pdf...";
                case "projects":
                case "projects/":
                    return (
                        <div className="text-blue-400">
                            Is a directory. Type 'projects' to view content.
                        </div>
                    );
                case "dont_open.txt":
                    return "I told you not to open it! 😼 (Just kidding, nothing here yet)";
                default:
                    return `cat: ${fileName}: No such file or directory`;
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        const [cmd, ...args] = trimmedInput.split(" ");
        const commandFn = commands[cmd.toLowerCase()];

        let output: string | JSX.Element = `Command not found: ${cmd}`;

        if (commandFn) {
            output = commandFn(args);
        } else if (cmd === "sudo" && args.length === 0) {
            output = "usage: sudo <command>";
        }

        if (cmd.toLowerCase() !== "clear") {
            setHistory((prev) => [...prev, { command: trimmedInput, output }]);
        }

        setInput("");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        drag
                        dragListener={false}
                        dragControls={dragControls}
                        dragMomentum={false}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-2xl bg-[#0d1117] border border-white/10 rounded-lg shadow-2xl overflow-hidden font-mono text-sm md:text-base relative"
                        onClick={(e) => e.stopPropagation()}
                        style={{ boxShadow: "0 0 50px rgba(0, 255, 0, 0.1)" }}
                    >
                        {/* Header */}
                        <div
                            onPointerDown={(e) => dragControls.start(e)}
                            className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-white/10 cursor-move"
                        >
                            <div className="flex items-center gap-2 text-muted-foreground select-none">
                                <Terminal className="w-4 h-4 text-green-500" />
                                <span className="text-green-500/80">rachit@portfolio: ~</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-muted-foreground hover:text-white transition-colors cursor-pointer"
                                onPointerDown={(e) => e.stopPropagation()}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div
                            ref={scrollRef}
                            className="h-[400px] overflow-y-auto p-4 font-mono text-sm md:text-base bg-black/95 text-green-400 scrollbar-thin scrollbar-thumb-green-900/50 scrollbar-track-transparent"
                            style={{
                                textShadow: "0 0 4px rgba(74, 222, 128, 0.3)",
                                backgroundImage:
                                    "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                                backgroundSize: "100% 2px, 3px 100%",
                            }}
                            onClick={() => inputRef.current?.focus()}
                        >
                            <div className="flex flex-col gap-2 min-h-full">
                                <div className="text-white/80 mb-4 opacity-80">
                                    <p>Welcome to Portfolio CLI v1.0.0</p>
                                    <p className="text-xs text-white/50 mt-1">Type 'help' to see available commands.</p>
                                </div>

                                {history.map((entry, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="flex gap-2">
                                            <span className="text-pink-500">➜</span>
                                            <span className="text-cyan-400">~</span>
                                            <span className="text-yellow-200">{entry.command}</span>
                                        </div>
                                        <div className="text-green-400/90 pl-6 whitespace-pre-wrap leading-relaxed">
                                            {entry.output}
                                        </div>
                                    </div>
                                ))}

                                <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                                    <span className="text-pink-500">➜</span>
                                    <span className="text-cyan-400">~</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none text-yellow-200 placeholder-white/20 focus:ring-0 p-0"
                                        autoFocus
                                        spellCheck={false}
                                        autoComplete="off"
                                    />
                                    <span className="w-2 h-4 bg-green-500 animate-pulse" />
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
