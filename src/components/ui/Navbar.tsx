import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Magnetic } from "./Magnetic";

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ name: "About", href: "#about" },
		{ name: "Skills", href: "#skills" },
		{ name: "Experience", href: "#experience" },
		{ name: "Work", href: "#projects" },
		// { name: "Contact", href: "#contact" },
	];

	const handleScrollTo = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		e.preventDefault();
		setIsOpen(false);

		// If not on home page, navigate to home with the hash
		if (location.pathname !== "/") {
			navigate({ to: "/" + href });
			return;
		}

		const element = document.querySelector(href);
		if (element) {
			setTimeout(() => {
				element.scrollIntoView({ behavior: "smooth" });
			}, 300);
		}
	};

	return (
		<>
			<nav
				className={`fixed top-0 left-0 w-full px-6 md:px-12 py-6 z-50 flex justify-between items-center transition-all duration-500 ${
					scrolled
						? "py-4 bg-[#020617]/90 border-b border-white/5"
						: "bg-transparent"
				}`}
			>
				<Link
					to="/"
					className="relative group font-display font-bold text-xl tracking-tighter uppercase text-white z-50"
				>
					<span className="relative z-10">Rachit</span>
					<span className="text-cyan-500">.</span>
					<span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full" />
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex items-center gap-2 bg-white/5 px-4 py-2 border border-white/5 shadow-lg shadow-cyan-900/10">
					{navItems.map((item) => (
						<Magnetic key={item.name} strength={0.2}>
							<a
								href={item.href}
								onClick={(e) => handleScrollTo(e, item.href)}
								className="font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer px-4 py-2 relative group"
							>
								<span className="relative z-10">{item.name}</span>
								<span className="absolute inset-0 bg-white/5 scale-0 transition-transform duration-300 group-hover:scale-100" />
							</a>
						</Magnetic>
					))}
					{/* <div className="w-[1px] h-4 bg-white/10 mx-2" />
					<Magnetic strength={0.2}>
						<Link
							to="/stats"
							className="font-mono text-xs uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer px-4 py-2 relative group"
						>
							<span className="relative z-10">Stats</span>
							<span className="absolute inset-0 bg-cyan-500/10 scale-0 transition-transform duration-300 group-hover:scale-100" />
						</Link>
					</Magnetic> */}
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden z-50">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="w-10 h-10 flex flex-col justify-center items-end gap-1.5 group relative"
					>
						<motion.div
							animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
							className="w-8 h-[2px] bg-white transition-all duration-300 group-hover:w-6"
						/>
						<motion.div
							animate={{ opacity: isOpen ? 0 : 1 }}
							className="w-6 h-[2px] bg-white transition-all duration-300 group-hover:w-8"
						/>
						<motion.div
							animate={{
								rotate: isOpen ? -45 : 0,
								y: isOpen ? -8 : 0,
								width: isOpen ? 32 : 16,
							}}
							className="w-4 h-[2px] bg-white transition-all duration-300 group-hover:w-8"
						/>
					</button>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 bg-[#020617] z-40 flex flex-col items-center justify-center md:hidden will-change-[opacity]"
					>
						{/* Simplified Background - no external image */}
						<div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-transparent pointer-events-none" />

						<div className="flex flex-col items-center gap-8 relative z-10">
							{navItems.map((item, index) => (
								<motion.div
									key={item.name}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									transition={{ delay: index * 0.05, duration: 0.3 }}
									className="will-change-transform"
								>
									<a
										href={item.href}
										onClick={(e) => handleScrollTo(e, item.href)}
										className="font-display text-5xl font-bold uppercase tracking-tighter text-white hover:text-cyan-400 transition-colors"
									>
										{item.name}
									</a>
								</motion.div>
							))}
						</div>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="absolute bottom-12 flex flex-col items-center gap-4 text-neutral-500 font-mono text-sm"
						>
							<div className="w-[1px] h-12 bg-white/10 mb-4" />
							<p>Based in The Internet</p>
							<p>© 2026 Rachit</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
