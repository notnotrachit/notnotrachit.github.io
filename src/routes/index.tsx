import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from "framer-motion";
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
    FaCode,
    FaArrowRight
} from "react-icons/fa";
import { useEffect, useState } from "react";
import ProjectData from "@/data/projects.json";
import CertificateData from "@/data/certifications.json";
import AchievementData from "@/data/achievements.json";
import { IconCloud } from "@/components/ui/icon-cloud";

export const Route = createFileRoute('/')({
  component: Home,
})

// --- Components ---

const Typewriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
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

const SectionHeader = ({ number, title }: { number: string; title: string }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-12"
    >
        <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <span className="text-primary font-bold">{number}.</span>
            <span>{title}</span>
        </div>
        <div className="h-px flex-grow bg-gradient-to-r from-primary/30 to-transparent" />
    </motion.div>
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
    const [blogs, setBlogs] = useState<any[]>([]);

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
                <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    href={blog.url}
                    target="_blank"
                    key={index}
                    className="glass-hover glass p-5 rounded-2xl flex flex-col gap-4 group"
                >
                    {blog.cover_image && (
                        <div className="relative h-40 w-full overflow-hidden rounded-xl border border-white/5">
                            <img 
                                src={blog.cover_image} 
                                alt={blog.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 absolute inset-0" 
                            />
                        </div>
                    )}
                    <div className="flex flex-col gap-2 flex-grow">
                        <h4 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                            {blog.title}
                        </h4>
                        <div className="flex gap-2 text-xs text-muted-foreground mt-auto items-center">
                            <span className="bg-secondary px-2 py-1 rounded-md">{new Date(blog.published_at).toLocaleDateString()}</span>
                            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                            <span>{blog.reading_time_minutes} min read</span>
                        </div>
                    </div>
                </motion.a>
            ))}
        </div>
    );
};

function Home() {
    return (
        <main className="min-h-screen py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-7xl space-y-40 relative">
            {/* Dynamic Background */}
            <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
            </div>

            {/* Hero Section */}
            <section className="min-h-[80vh] flex flex-col justify-center space-y-8 max-w-5xl">
                <div className="flex flex-col md:flex-row md:items-center gap-10 mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-500 rounded-full blur-2xl opacity-50 animate-pulse-slow" />
                        <img
                            src="/profile.jpg"
                            alt="Rachit Khurana"
                            width={180}
                            height={180}
                            className="relative rounded-full border-4 border-white/10 ring-4 ring-primary/30 object-cover shadow-2xl"
                        />
                        <div className="absolute bottom-4 right-4 text-4xl animate-bounce">👋</div>
                    </motion.div>
                    
                    <div className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-mono backdrop-blur-md"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            Available for new opportunities
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl md:text-8xl font-bold tracking-tight leading-none"
                        >
                            Hi, I'm <span className="text-gradient"><Typewriter text="Rachit" /></span>
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl md:text-3xl text-muted-foreground max-w-3xl font-light leading-relaxed"
                        >
                            Full Stack Engineer crafting <span className="text-foreground font-medium decoration-primary/50 underline underline-offset-8 decoration-2">Scalable Web Apps</span> and exploring the decentralized web.
                        </motion.p>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-4"
                >
                    <div className="flex gap-4">
                        {[
                            { icon: FaGithub, href: "https://github.com/notnotrachit", label: "GitHub" },
                            { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                            { icon: FaTwitter, href: "https://twitter.com/notnotrachit", label: "Twitter" },
                            { icon: FaEnvelope, href: "mailto:rachit@example.com", label: "Email" },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                className="p-4 glass rounded-2xl hover:bg-white/10 hover:text-primary hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
                                aria-label={social.label}
                            >
                                <social.icon size={24} className="group-hover:scale-110 transition-transform" />
                            </a>
                        ))}
                    </div>
                    
                    <Link
                        to="/stats"
                        className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-primary/30 hover:border-primary/60 rounded-2xl transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/20"
                    >
                        <FaCode className="text-primary text-lg" />
                        <span className="font-mono text-base">View Coding Stats</span>
                        <FaArrowRight className="text-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                </motion.div>
            </section>

            {/* About Me */}
            <section id="about" className="scroll-mt-32">
                <SectionHeader number="01" title="ABOUT ME" />
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, rotateY: 30 }}
                        whileInView={{ opacity: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        className="glass p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent"
                    >
                        <div className="bg-[#0e0e0e] rounded-xl p-6 font-mono text-sm overflow-hidden shadow-2xl">
                            {/* Terminal Header */}
                            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="text-xs text-muted-foreground">rachit.json</div>
                            </div>

                            <div className="space-y-3 text-blue-200/80">
                                <p>
                                    <span className="text-pink-400">const</span>{" "}
                                    <span className="text-yellow-300">developer</span> <span className="text-pink-400">=</span> {"{"}
                                </p>
                                <p className="pl-6">
                                    <span className="text-purple-400">name</span>: <span className="text-green-300">&quot;Rachit Khurana&quot;</span>,
                                </p>
                                <p className="pl-6">
                                    <span className="text-purple-400">focus</span>: <span className="text-green-300">&quot;Full Stack & Web3&quot;</span>,
                                </p>
                                <p className="pl-6">
                                    <span className="text-purple-400">stack</span>: [
                                    <span className="text-green-300">&quot;Next.js&quot;</span>,{" "}
                                    <span className="text-green-300">&quot;Python&quot;</span>,{" "}
                                    <span className="text-green-300">&quot;Go&quot;</span>,{" "}
                                    <span className="text-green-300">&quot;Solidity&quot;</span>],
                                </p>
                                <p className="pl-6">
                                    <span className="text-purple-400">loves</span>: [
                                    <span className="text-green-300">&quot;Open Source&quot;</span>,{" "}
                                    <span className="text-green-300">&quot;Music&quot;</span>,{" "}
                                    <span className="text-green-300">&quot;Hackathons&quot;</span>],
                                </p>
                                <p className="pl-6">
                                    <span className="text-purple-400">status</span>: <span className="text-green-300">&quot;Building & Learning&quot;</span>
                                </p>
                                <p>{"};"}</p>
                            </div>
                        </div>
                    </motion.div>
                    
                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                        <p className="text-foreground text-xl font-light">
                            I'm a passionate developer who bridges the gap between complex backend logic and beautiful user interfaces.
                        </p>
                        <p>
                            My journey started with simple HTML websites and has evolved into building complex full-stack applications. I love open source and am actively involved in the FOSS community.
                        </p>
                        <p>
                            When I'm not coding, you can find me participating in hackathons, mentoring peers, or exploring the latest trends in decentralized technologies and AI.
                        </p>
                    </div>
                </div>
            </section>


            {/* Experience */}
            <section id="experience" className="scroll-mt-32">
                <SectionHeader number="02" title="EXPERIENCE" />

                <div className="space-y-20">
                    {/* Work Experience */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-3 mb-10 text-foreground/90">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <FaBriefcase size={20} /> 
                            </div>
                            Work Experience
                        </h3>
                        <div className="relative border-l-2 border-white/5 ml-4 md:ml-9 space-y-12 pl-8 md:pl-12">
                            {workExperience.map((job, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <div className="absolute -left-[41px] md:-left-[61px] top-0 p-1 bg-background rounded-full border border-white/10">
                                        <img
                                            src={job.logo}
                                            alt={job.company}
                                            width={48}
                                            height={48}
                                            className="rounded-full w-8 h-8 md:w-12 md:h-12 object-cover"
                                        />
                                    </div>
                                    <div className="glass-hover glass p-6 rounded-2xl group cursor-default">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                                            <div>
                                                <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {job.role}
                                                </h4>
                                                <p className="text-primary/80 font-medium">{job.company}</p>
                                            </div>
                                            <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-white/5 w-fit">
                                                {job.period}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {job.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Volunteering */}
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-3 mb-10 text-foreground/90">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                <FaAward size={20} /> 
                            </div>
                            Leadership & Community
                        </h3>
                        <div className="relative border-l-2 border-white/5 ml-4 md:ml-9 space-y-12 pl-8 md:pl-12">
                            {volunteering.map((job, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <div className="absolute -left-[41px] md:-left-[61px] top-0 p-1 bg-background rounded-full border border-white/10">
                                        <img
                                            src={job.logo}
                                            alt={job.company}
                                            width={48}
                                            height={48}
                                            className="rounded-full w-8 h-8 md:w-12 md:h-12 object-cover"
                                        />
                                    </div>
                                    <div className="glass-hover glass p-6 rounded-2xl group cursor-default">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                                            <div>
                                                <h4 className="text-xl font-bold text-foreground group-hover:text-blue-400 transition-colors">
                                                    {job.role}
                                                </h4>
                                                <p className="text-blue-400/80 font-medium">{job.company}</p>
                                            </div>
                                            <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-white/5 w-fit">
                                                {job.period}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
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
            <section id="projects" className="scroll-mt-32">
                <SectionHeader number="03" title="FEATURED PROJECTS" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ProjectData.documents.slice(0, 9).map((project, index) => (
                        <motion.a
                            href={project.URL || project.GitHub}
                            target="_blank"
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08, duration: 0.4 }}
                            viewport={{ once: true }}
                            className="group relative rounded-2xl glass overflow-hidden flex flex-col h-full hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] bg-[#0a0a0a]"
                        >
                            {/* Project Image */}
                            <div className="relative h-48 w-full overflow-hidden bg-secondary">
                                {project.image_url ? (
                                    <img
                                        src={project.image_url}
                                        alt={project.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-background">
                                        <span className="text-4xl font-bold text-white/5">{project.name.charAt(0)}</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                                
                                {/* Overlay Links */}
                                <div className="absolute bottom-4 right-4 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    {project.GitHub && (
                                        <span className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-primary hover:text-white transition-colors">
                                            <FaGithub size={16} />
                                        </span>
                                    )}
                                    {project.URL && (
                                        <span className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-primary hover:text-white transition-colors">
                                            <FaExternalLinkAlt size={14} />
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow relative z-10">
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors mb-2 line-clamp-1">
                                    {project.name}
                                </h3>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.Tech_stack.slice(0, 3).map((t) => (
                                        <span
                                            key={t}
                                            className="text-[10px] font-mono bg-secondary/50 px-2 py-1 rounded text-muted-foreground border border-white/5"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                    {project.Tech_stack.length > 3 && (
                                        <span className="text-[10px] font-mono text-muted-foreground py-1 px-1">+{project.Tech_stack.length - 3}</span>
                                    )}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
                {ProjectData.documents.length > 9 && (
                    <div className="flex justify-center mt-12">
                        <a
                            href="https://github.com/notnotrachit"
                            target="_blank"
                            className="group flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-all font-mono text-sm"
                        >
                            View All Projects 
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                )}
            </section>

            {/* Skills */}
            <section id="skills" className="scroll-mt-32">
                <SectionHeader number="04" title="SKILLS" />
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Skill Tags */}
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
                                items: ["Linux", "Git", "Docker", "GitHub", "AWS", "Azure"]
                            }
                        ].map((skillGroup, index) => (
                            <div key={index}>
                                <h3 className="text-lg font-medium mb-5 text-foreground/80 border-l-2 border-primary/50 pl-3">{skillGroup.category}</h3>
                                <div className="flex flex-wrap gap-3 justify-start">
                                    {skillGroup.items.map((skill, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.03 }}
                                            className="px-4 py-2 rounded-lg glass-hover glass text-sm text-muted-foreground hover:text-foreground cursor-default transition-all duration-300"
                                        >
                                            {skill}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Icon Cloud */}
                    <div className="relative flex items-center justify-center min-h-[400px] glass rounded-3xl p-8 bg-gradient-to-b from-white/5 to-transparent">
                        <IconCloud
                            images={[
                                "python", "javascript", "java", "go", "cplusplus", "css3", "html5",
                                "mongodb", "postgresql", "mysql", "django", "flask", "fastapi",
                                "nextdotjs", "react", "tailwindcss", "linux", "git", "docker", "github", "amazonwebservices", "azure"
                            ].map(slug => `https://cdn.simpleicons.org/${slug}`)}
                        />
                    </div>
                </div>
            </section>

            {/* Education & Certifications */}
            <section id="education" className="scroll-mt-32">
                <SectionHeader number="05" title="EDUCATION & CERTIFICATIONS" />

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Education */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold flex items-center gap-3 mb-8">
                             <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <FaGraduationCap size={20} />
                            </div>
                            Education
                        </h3>
                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ x: 5 }}
                                    className="flex gap-5 group p-4 rounded-xl hover:bg-white/5 transition-all"
                                >
                                    <div className="flex-shrink-0">
                                        <img src={edu.logo} width={56} height={56} alt={edu.school} className="rounded-xl border border-white/10" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{edu.school}</h4>
                                        <p className="text-sm font-mono text-muted-foreground mb-2 mt-1">{edu.degree} • {edu.period}</p>
                                        <p className="text-sm text-foreground/70">{edu.details}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold flex items-center gap-3 mb-8">
                            <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                                <FaCertificate size={20} />
                            </div>
                            Certifications
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {CertificateData.documents.map((cert, i) => (
                                <a 
                                    href={cert.credential_url} 
                                    target="_blank" 
                                    key={i} 
                                    className="glass-hover glass p-5 rounded-xl flex flex-col gap-3 group border-l-2 border-l-transparent hover:border-l-green-500"
                                >
                                    <div className="flex justify-between items-start">
                                         <h4 className="font-bold text-sm line-clamp-2 leading-snug group-hover:text-green-400 transition-colors">{cert.name}</h4>
                                         <FaExternalLinkAlt size={10} className="text-muted-foreground opacity-50 group-hover:opacity-100" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">{cert.issuing_authority}</p>
                                    <div className="mt-auto pt-2">
                                        <span className="text-[10px] font-mono bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20">Verified</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section id="achievements" className="scroll-mt-32">
                <SectionHeader number="06" title="ACHIEVEMENTS" />
                <div className="grid md:grid-cols-2 gap-6">
                    {AchievementData.achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="glass p-6 rounded-2xl flex items-start gap-5 hover:border-primary/40 transition-colors group bg-gradient-to-br from-white/5 to-transparent"
                        >
                            <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-background border border-white/10 p-1">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-primary bg-primary/10 rounded-lg">
                                        <FaAward size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-bold text-lg group-hover:text-primary transition-colors leading-tight mb-2">{item.title}</h4>
                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 font-medium text-sm mb-2">{item.award}</p>
                                {item.subAward && <p className="text-xs text-muted-foreground">{item.subAward}</p>}
                                {item.teammates && (
                                    <p className="text-xs text-muted-foreground mt-2">
                                        <span className="opacity-50">Team:</span> {item.teammates.join(", ")}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Blogs */}
            <section id="blogs" className="scroll-mt-32">
                <SectionHeader number="07" title="LATEST ARTICLES" />
                <BlogSection />
            </section>

            {/* Contact */}
            <section id="contact" className="scroll-mt-32">
                <SectionHeader number="08" title="GET IN TOUCH" />
                <div className="glass p-8 md:p-12 rounded-3xl text-center max-w-3xl mx-auto bg-gradient-to-b from-primary/5 to-transparent border-primary/20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Work Together</h2>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                        I'm currently looking for new opportunities. Whether you have a question, 
                        want to discuss a project, or just want to say hi, I'll try my best to get back to you!
                    </p>
                    <a 
                        href="mailto:rachit@example.com" 
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]"
                    >
                        <FaEnvelope />
                        Say Hello
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="pt-24 pb-12 text-center text-sm text-muted-foreground border-t border-white/5 mt-20">
                <div className="flex justify-center gap-6 mb-8">
                     {[
                        { icon: FaGithub, href: "https://github.com/notnotrachit" },
                        { icon: FaLinkedin, href: "https://linkedin.com" },
                        { icon: FaTwitter, href: "https://twitter.com/notnotrachit" },
                    ].map((social, i) => (
                        <a key={i} href={social.href} target="_blank" className="hover:text-primary transition-colors">
                            <social.icon size={20} />
                        </a>
                    ))}
                </div>
                <p>
                    Designed & Built with <span className="text-red-500">♥</span> by <span className="text-foreground font-medium">Rachit Khurana</span>
                </p>
                <p className="text-xs mt-4 opacity-50 font-mono">
                    TanStack Start • Tailwind • Framer Motion
                </p>
            </footer>
        </main>
    );
}
