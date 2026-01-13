import { createFileRoute } from "@tanstack/react-router";
import { BackgroundParallax } from "../components/ui/BackgroundParallax";
import { About } from "../components/sections/About";
import { Achievements } from "../components/sections/Achievements";
import { Contact } from "../components/sections/Contact";
import { Education } from "../components/sections/Education";
import { Experience } from "../components/sections/Experience";
import { Hero } from "../components/sections/Hero";
import { Projects } from "../components/sections/Projects";
import { Skills } from "../components/sections/Skills";
import { Footer } from "../components/ui/Footer";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<main className="w-full bg-transparent min-h-screen selection:bg-cyan-500/30 selection:text-white relative">
			<BackgroundParallax />
			<div className="relative z-10">
				<Hero />
				<About />
				<Skills />
				<Experience />
				<Projects />
				<Achievements />
				<Education />
				{/* <Contact /> */}
				<Footer />
			</div>
		</main>
	);
}
