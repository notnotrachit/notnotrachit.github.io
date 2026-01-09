import { createFileRoute } from '@tanstack/react-router'
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe, FaEnvelope } from "react-icons/fa";

export const Route = createFileRoute('/links')({
  component: Links,
})

const links = [
    { 
        name: "Portfolio Website", 
        url: "https://rachit.is-a.dev", 
        icon: FaGlobe,
        color: "bg-blue-500" 
    },
    { 
        name: "GitHub", 
        url: "https://github.com/notnotrachit", 
        icon: FaGithub,
        color: "bg-gray-800" 
    },
    { 
        name: "LinkedIn", 
        url: "https://linkedin.com/in/rachit-khurana", 
        icon: FaLinkedin,
        color: "bg-blue-700" 
    },
    { 
        name: "Twitter / X", 
        url: "https://twitter.com/notnotrachit", 
        icon: FaTwitter,
        color: "bg-black" 
    },
    { 
        name: "Instagram", 
        url: "https://instagram.com", 
        icon: FaInstagram,
        color: "bg-pink-600" 
    },
    { 
        name: "Email Me", 
        url: "mailto:rachit@example.com", 
        icon: FaEnvelope,
        color: "bg-green-600" 
    },
];

function Links() {
  return (
    <main className="min-h-screen py-20 px-4 relative flex flex-col items-center justify-center">
       {/* Dynamic Background */}
       <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto space-y-8"
      >
        {/* Profile Header */}
        <div className="text-center space-y-4">
            <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-500 rounded-full blur-xl opacity-50" />
                <img 
                    src="/profile.jpg" 
                    alt="Rachit Khurana" 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/10 relative z-10 object-cover mx-auto"
                />
            </div>
            <div>
                <h1 className="text-2xl font-bold">Rachit Khurana</h1>
                <p className="text-muted-foreground">Full Stack Developer & Web3 Enthusiast</p>
            </div>
        </div>

        {/* Links Container */}
        <div className="space-y-4">
            {links.map((link, index) => (
                <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center p-1 rounded-xl glass hover:bg-white/10 transition-all group relative overflow-hidden"
                >
                    <div className={`p-3 rounded-lg ${link.color} text-white mr-4 relative z-10`}>
                        <link.icon size={20} />
                    </div>
                    <span className="font-medium text-lg relative z-10">{link.name}</span>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </motion.a>
            ))}
        </div>
      </motion.div>
    </main>
  )
}
