"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaEnvelope,
    FaExternalLinkAlt,
    FaGraduationCap,
    FaBriefcase,
    FaAward,
    FaCertificate,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import ProjectData from "@/data/projects.json";
import CertificateData from "@/data/certifications.json";
import AchievementData from "@/data/achievements.json";

// --- Components ---

const Typewriter = ({ text, delay = 50 }) => {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    return <span>{currentText}</span>;
};

const SectionHeader = ({ number, title }) => (
    <div className="flex items-center gap-2 text-primary/80 font-mono text-sm tracking-widest mb-8">
        <span className="text-primary">{number}.</span>
        <span className="h-px w-12 bg-primary/30" />
        <span>{title}</span>
    </div>
);

// --- Data ---

const workExperience = [
    {
        company: "Hyathi Technologies",
        role: "Full Stack & Web3 Developer Intern",
        period: "Dec 2024 - Present",
        logo: "/hyathi_technologies_logo.jpeg",
        description:
            "Working on a variety of projects involving Full Stack and Web3 technologies for enterprise clients.",
    },
    {
        company: "ClearMind AI",
        role: "Full Stack Developer Intern",
        period: "Jun 2023 - Aug 2023",
        logo: "/clearai.jpeg",
        description:
            "Engineered the ClearMind Journaling Web App using Next.js and Tailwind, integrating OpenAI and Azure APIs. Scaled to 45k+ users.",
    },
];

const volunteering = [
    {
        company: "Microsoft Learn Student Ambassadors",
        role: "Beta MLSA",
        period: "Sep 2023 - Present",
        logo: "/mlsa.png",
        description:
            "Conducting workshops, mentoring students, and building a community around Microsoft technologies.",
    },
    {
        company: "CSI Bennett University",
        role: "Chief Technical Officer",
        period: "Aug 2023 - Aug 2024",
        logo: "/csi.jpg",
        description:
            "Led technical initiatives and managed the tech team for university events and workshops.",
    },
    {
        company: "GDSC Bennett University",
        role: "Tech Team Member",
        period: "Nov 2022 - Aug 2023",
        logo: "/gdsc.svg",
        description:
            "We at GDSC BU conducted a lot of amazing events which included our flagship event, Google Week.",
    },
];

const education = [
    {
        school: "Bennett University",
        degree: "BTech CSE",
        period: "2022 - 2026",
        logo: "/bennett.png",
        details: "Ongoing",
    },
    {
        school: "Sardar Patel Vidyalaya",
        degree: "XI - XII",
        period: "2020 - 2022",
        logo: "/spv.jpg",
        details: "XII Boards - 84.8%",
    },
    {
        school: "Apeejay School Noida",
        degree: "Nursery - X",
        period: "2008 - 2020",
        logo: "/apeejay.jpg",
        details: "X Boards - 90.2%",
    },
];

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("https://dev.to/api/articles?username=dilutewater")
            .then((res) => res.json())
            .then((data) => setBlogs(data.slice(0, 3)))
            .catch((err) => console.error(err));
    }, []);

    if (blogs.length === 0) return null;

    return (
        <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
                <a
                    href={blog.url}
                    target="_blank"
                    key={index}
                    className="glass p-6 rounded-2xl flex flex-col gap-4 hover:bg-secondary/40 transition-colors group"
                >
                    {blog.cover_image && (
                        <div className="relative h-40 w-full overflow-hidden rounded-lg">
                            <Image src={blog.cover_image} alt={blog.title} fill className="object-cover group-hover:scale-110 transition-transform" />
                        </div>
                    )}
                    <div className="flex flex-col gap-2 flex-grow">
                        <h4 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                            {blog.title}
                        </h4>
                        <div className="flex gap-2 text-xs text-muted-foreground mt-auto">
                            <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{blog.reading_time_minutes} min read</span>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default function Home() {
    return (
        <main className="min-h-screen py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-7xl space-y-32">
            {/* Background Glow */}
            <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10" />

            {/* Hero Section */}
            <section className="space-y-6 max-w-4xl">
                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex-shrink-0"
                    >
                        <Image
                            src="/profile.jpg"
                            alt="Rachit Khurana"
                            width={150}
                            height={150}
                            className="rounded-full border-4 border-primary/50 hover:border-primary transition-colors duration-300 hover:scale-105 transform"
                        />
                    </motion.div>
                    <div>
                        <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-4">
                            <span className="animate-pulse">●</span> Available for work
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter glow-text">
                            <Typewriter text="Rachit Khurana" />
                            <span className="animate-blink text-primary">_</span>
                        </h1>
                    </div>
                </div>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed">
                    Full Stack Engineer specializing in{" "}
                    <span className="text-foreground font-medium">Scalable Web Apps</span>,{" "}
                    <span className="text-primary font-medium">Web3</span>, and{" "}
                    <span className="text-foreground font-medium">Cloud</span>.
                    Based in India.
                </p>

                <div className="flex gap-4 pt-6">
                    {[
                        { icon: FaGithub, href: "https://github.com/notnotrachit" },
                        { icon: FaLinkedin, href: "https://linkedin.com" },
                        { icon: FaTwitter, href: "https://twitter.com/notnotrachit" },
                        { icon: FaEnvelope, href: "mailto:rachit@example.com" },
                    ].map((social, i) => (
                        <motion.a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.1, color: "#a78bfa" }}
                            className="text-muted-foreground hover:text-primary transition-colors p-3 bg-secondary/50 rounded-lg border border-white/5 hover:border-primary/50 hover:bg-secondary/80"
                        >
                            <social.icon size={22} />
                        </motion.a>
                    ))}
                </div>
            </section>

            {/* About Me */}
            <section id="about" className="scroll-mt-24">
                <SectionHeader number="01" title="ABOUT ME" />
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="rounded-xl border border-white/10 bg-[#0d0d0d] p-6 font-mono text-sm shadow-2xl relative group order-2 md:order-1"
                    >
                        {/* Window Controls */}
                        <div className="flex gap-2 mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                            <div className="w-3 h-3 rounded-full bg-[#fa5252]" />
                            <div className="w-3 h-3 rounded-full bg-[#eebb00]" />
                            <div className="w-3 h-3 rounded-full bg-[#1c7ed6]" />
                        </div>

                        <div className="space-y- leading-relaxed text-gray-400">
                            <p>
                                <span className="text-[#ff79c6]">const</span>{" "}
                                <span className="text-[#8be9fd]">developer</span> <span className="text-[#ff79c6]">=</span> {"{"}
                            </p>
                            <p className="pl-6">
                                <span className="text-[#bd93f9]">name</span>: <span className="text-[#f1fa8c]">"Rachit Khurana"</span>,
                            </p>
                            <p className="pl-6">
                                <span className="text-[#bd93f9]">location</span>: <span className="text-[#f1fa8c]">"India"</span>,
                            </p>
                            <p className="pl-6">
                                <span className="text-[#bd93f9]">role</span>: <span className="text-[#f1fa8c]">"Full Stack Engineer"</span>,
                            </p>
                            <p className="pl-6">
                                <span className="text-[#bd93f9]">skills</span>: [
                                <span className="text-[#f1fa8c]">"Next.js"</span>,{" "}
                                <span className="text-[#f1fa8c]">"Python"</span>,{" "}
                                <span className="text-[#f1fa8c]">"Go"</span>,{" "}
                                <span className="text-[#f1fa8c]">"Web3"</span>],
                            </p>
                            <p className="pl-6">
                                <span className="text-[#bd93f9]">hobbies</span>: [
                                <span className="text-[#f1fa8c]">"Music"</span>,{" "}
                                <span className="text-[#f1fa8c]">"FOSS"</span>],
                            </p>
                            <p>{"};"}</p>
                        </div>
                    </motion.div>
                    <div className="order-1 md:order-2 space-y-4 text-muted-foreground leading-relaxed">
                        <p>My journey started with simple HTML websites and has evolved into building complex full-stack applications. I love open source and am actively involved in the FOSS community.</p>
                        <p>I focus on building software that is scalable, maintainable, and user-friendly. Currently, I am exploring the depths of Cloud Computing and Decentralized Applications.</p>
                    </div>
                </div>
            </section>


            {/* Experience */}
            <section id="experience" className="scroll-mt-24">
                <SectionHeader number="02" title="EXPERIENCE" />

                <div className="space-y-16">
                    {/* Work Experience */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2 mb-8">
                            <FaBriefcase className="text-primary" /> Work Experience
                        </h3>
                        <div className="relative border-l-2 border-primary/30 ml-7 space-y-10 pl-12">
                            {workExperience.map((job, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <span className="absolute -left-[76px] top-4 flex items-center justify-center w-14 h-14 rounded-full bg-background border-2 border-primary/50">
                                        <Image
                                            src={job.logo}
                                            alt={job.company}
                                            width={48}
                                            height={48}
                                            className="rounded-full object-cover"
                                        />
                                    </span>
                                    <div className="glass p-6 rounded-xl hover:border-primary/30 transition-colors">
                                        <h4 className="text-xl font-bold text-foreground flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                            {job.role}
                                            <span className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded w-fit">
                                                {job.period}
                                            </span>
                                        </h4>
                                        <p className="text-primary font-medium mb-3">{job.company}</p>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {job.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Volunteering */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2 mb-8">
                            <FaBriefcase className="text-primary" /> Leadership & Community
                        </h3>
                        <div className="relative border-l-2 border-primary/30 ml-7 space-y-10 pl-12">
                            {volunteering.map((job, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <span className="absolute -left-[76px] top-4 flex items-center justify-center w-14 h-14 rounded-full bg-background border-2 border-primary/50">
                                        <Image
                                            src={job.logo}
                                            alt={job.company}
                                            width={48}
                                            height={48}
                                            className="rounded-full object-cover"
                                        />
                                    </span>
                                    <div className="glass p-6 rounded-xl hover:border-primary/30 transition-colors">
                                        <h4 className="text-xl font-bold text-foreground flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                            {job.role}
                                            <span className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded w-fit">
                                                {job.period}
                                            </span>
                                        </h4>
                                        <p className="text-primary font-medium mb-3">{job.company}</p>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {job.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section id="projects" className="scroll-mt-24">
                <SectionHeader number="03" title="FEATURED PROJECTS" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ProjectData.documents.map((project, index) => (
                        <motion.a
                            href={project.URL || project.GitHub}
                            target="_blank"
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="group relative p-6 rounded-2xl glass hover:border-primary/40 transition-all hover:-translate-y-1 overflow-hidden flex flex-col h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">
                                    {project.name}
                                </h3>
                                <div className="flex gap-2 text-muted-foreground">
                                    {project.GitHub && <FaGithub className="hover:text-primary" />}
                                    {project.URL && <FaExternalLinkAlt className="hover:text-primary text-xs" />}
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.Tech_stack.slice(0, 4).map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs font-mono bg-white/5 px-2 py-1 rounded text-primary/90 border border-white/5"
                                    >
                                        {t}
                                    </span>
                                ))}
                                {project.Tech_stack.length > 4 && (
                                    <span className="text-xs font-mono text-muted-foreground py-1">+{project.Tech_stack.length - 4}</span>
                                )}
                            </div>
                        </motion.a>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section id="skills" className="scroll-mt-24">
                <SectionHeader number="04" title="SKILLS" />
                <div className="space-y-12">
                    {[
                        {
                            category: "Languages & Databases",
                            items: ["Python", "JavaScript", "Java", "Golang", "C++", "CSS", "HTML", "MongoDB", "Postgres", "MySQL"]
                        },
                        {
                            category: "Frameworks",
                            items: ["Django", "Flask", "FastAPI", "NextJS", "ReactJS", "React Native", "TailwindCSS"]
                        },
                        {
                            category: "Other Tools",
                            items: ["Linux", "Git", "Docker", "GitHub"]
                        }
                    ].map((skillGroup, index) => (
                        <div key={index} className="text-center">
                            <h3 className="text-xl font-bold mb-6 text-foreground/80">{skillGroup.category}</h3>
                            <div className="flex flex-wrap gap-3 justify-center">
                                {skillGroup.items.map((skill, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="px-4 py-2 rounded-lg glass border border-white/5 hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                                    >
                                        {skill}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education & Certifications */}
            <section id="education" className="scroll-mt-24">
                <SectionHeader number="05" title="EDUCATION & CERTIFICATIONS" />

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Education */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
                            <FaGraduationCap className="text-primary" /> Education
                        </h3>
                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="flex-shrink-0">
                                        <Image src={edu.logo} width={50} height={50} alt={edu.school} className="rounded-full border border-white/10" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{edu.school}</h4>
                                        <p className="text-sm text-muted-foreground mb-1">{edu.degree} • {edu.period}</p>
                                        <p className="text-sm text-gray-500">{edu.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
                            <FaCertificate className="text-primary" /> Certifications
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {CertificateData.documents.map((cert, i) => (
                                <a href={cert.credential_url} target="_blank" key={i} className="glass p-4 rounded-xl hover:border-primary/40 transition-colors flex flex-col gap-2">
                                    <h4 className="font-bold text-sm line-clamp-2">{cert.name}</h4>
                                    <p className="text-xs text-muted-foreground">{cert.issuing_authority}</p>
                                    <span className="text-[10px] font-mono bg-primary/10 text-primary px-2 py-1 rounded w-fit mt-auto border border-primary/20">View Credential</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section id="achievements" className="scroll-mt-24">
                <SectionHeader number="06" title="ACHIEVEMENTS" />
                <div className="grid md:grid-cols-2 gap-6">
                    {AchievementData.achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass p-6 rounded-2xl flex items-center gap-4 hover:bg-secondary/40 transition-colors"
                        >
                            <div className="p-3 bg-primary/10 rounded-full text-primary">
                                <FaAward size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">{item.title}</h4>
                                <p className="text-primary/80 font-medium">{item.award}</p>
                                {item.subAward && <p className="text-sm text-muted-foreground">{item.subAward}</p>}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Blogs */}
            <section id="blogs" className="scroll-mt-24">
                <SectionHeader number="07" title="LATEST ARTICLES" />
                <BlogSection />
            </section>

            {/* Footer */}
            <footer className="pt-24 text-center text-sm text-gray-500 pb-8 border-t border-white/5 mt-12">
                <p>
                    Designed & Built by <span className="text-primary">Rachit Khurana</span>
                </p>
                <p className="text-xs mt-2 opacity-50">
                    Next.js • Tailwind • Framer Motion
                </p>
            </footer>
        </main>
    );
}
