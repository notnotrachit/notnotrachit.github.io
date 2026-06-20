import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

export function Footer() {
	const socialLinks = [
		{ name: "GitHub", url: "https://github.com/notnotrachit" },
		{ name: "LinkedIn", url: "https://linkedin.com/rachitkhurana1" },
		{ name: "Twitter (X)", url: "https://x.com/notnotrachit" },
		// { name: "Instagram", url: "https://instagram.com/notnotrachit" },
		{ name: "Email", url: "mailto:notnotrachit@gmail.com" },
	];

	return (
		<footer className="w-full relative z-10 bg-transparent">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
				className="container mx-auto px-6 md:px-12 max-w-7xl flex flex-col lg:flex-row justify-between items-center border-t border-white/10 py-10 backdrop-blur-sm gap-10 lg:gap-12 text-center lg:text-left"
			>
				<div className="flex flex-col items-center lg:items-start gap-4 lg:shrink-0">
					<div className="flex items-center justify-center lg:justify-start gap-2 text-neutral-400">
						<MapPin className="w-4 h-4 shrink-0" />
						<span className="font-body text-sm">Based in The Internet</span>
					</div>
					<div>
						<p className="font-body text-neutral-500 text-sm lg:whitespace-nowrap">
							&copy; 2026 Rachit. All rights reserved.
						</p>
						<p className="font-body text-neutral-600 text-xs mt-1 lg:whitespace-nowrap">
							Designed & Developed with <span className="text-white">
								♥
							</span>{" "}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-x-8 gap-y-7 w-full max-w-xs lg:max-w-none lg:w-auto lg:flex lg:flex-1 lg:flex-wrap lg:justify-end lg:gap-12">
					{socialLinks.map((link) => (
						<a
							key={link.name}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="group font-display font-bold text-neutral-400 hover:text-white transition-colors uppercase text-xs sm:text-sm tracking-widest flex items-center justify-center lg:justify-start gap-2"
						>
							{link.name}
							<ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
						</a>
					))}
				</div>
			</motion.div>
		</footer>
	);
}
