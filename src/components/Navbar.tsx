import { motion } from "framer-motion";
import { FaHome, FaUser, FaBriefcase, FaCode, FaShapes, FaGraduationCap, FaTrophy, FaNewspaper } from "react-icons/fa";
import { Link } from "@tanstack/react-router";

const navItems = [
    { name: "Home", icon: FaHome, href: "/" },
    { name: "About", icon: FaUser, href: "/#about" },
    { name: "Exp", icon: FaBriefcase, href: "/#experience" },
    { name: "Projects", icon: FaCode, href: "/#projects" },
    { name: "Skills", icon: FaShapes, href: "/#skills" },
    { name: "Edu", icon: FaGraduationCap, href: "/#education" },
    { name: "Awards", icon: FaTrophy, href: "/#achievements" },
    { name: "Blog", icon: FaNewspaper, href: "/#blogs" },
];

export function Navbar() {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
                className="flex items-center gap-2 px-4 py-3 rounded-full glass border border-white/10 shadow-2xl backdrop-blur-xl bg-black/20"
            >
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="group relative p-3 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                        aria-label={item.name}
                    >
                        <item.icon className="text-muted-foreground group-hover:text-primary transition-colors text-xl relative z-10" />
                        
                        {/* Tooltip */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-white/10 backdrop-blur-sm">
                            {item.name}
                        </span>
                        
                        {/* Active/Hover Indicator */}
                        <span className="absolute bottom-0 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                ))}
                
                <div className="w-px h-6 bg-white/10 mx-2" />
                
                <Link
                    to="/stats"
                    className="group relative p-3 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center bg-primary/20 hover:bg-primary/30 border border-primary/20"
                    title="View Stats"
                >
                     <div className="text-primary font-bold text-xs font-mono">
                        SRC
                     </div>
                </Link>
            </motion.div>
        </div>
    );
}
