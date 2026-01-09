import { createFileRoute } from "@tanstack/react-router";
import { About } from "../components/sections/About";
import { Achievements } from "../components/sections/Achievements";
import { Contact } from "../components/sections/Contact";
import { Education } from "../components/sections/Education";
import { Experience } from "../components/sections/Experience";
import { Hero } from "../components/sections/Hero";
import { Projects } from "../components/sections/Projects";
import { Skills } from "../components/sections/Skills";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<main className="w-full bg-background min-h-screen selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">
			<Hero />
			<About />
			<Skills />
			<Experience />
			<Projects />
			<Education />
			<Achievements />
			<Contact />
		</main>
	);
}
