export interface ExperienceItem {
	id: number;
	company: string;
	role: string;
	period: string;
	description: string;
	logo: string;
	type: "work" | "volunteering";
	technologies: string[];
}

export const experience: ExperienceItem[] = [
	{
		id: 1,
		company: "Hyathi Technologies",
		role: "Full Stack & Web3 Developer Intern",
		period: "Dec 2024 - Present",
		logo: "/logos/hyathi.jpeg",
		description:
			"Working on a variety of projects involving Full Stack and Web3 technologies for enterprise clients.",
		type: "work",
		technologies: [
			"React",
			"Next.js",
			"Node.js",
			"Rust",
			"Tauri",
			"Solidity",
			"Python",
		],
	},
	{
		id: 2,
		company: "ClearMind AI",
		role: "Full Stack Developer Intern",
		period: "Jun 2023 - Aug 2023",
		logo: "/logos/clearai.jpeg",
		description:
			"Engineered the ClearMind Journaling Web App using Next.js and Tailwind, integrating OpenAI and Azure APIs. Scaled to 45k+ users.",
		type: "work",
		technologies: ["Next.js", "TailwindCSS", "OpenAI API", "Azure"],
	},
	{
		id: 3,
		company: "FOSS United College Chapter, Bennett University",
		role: "Lead",
		period: "Sep 2024 - Sep 2025",
		logo: "/logos/foss_club.svg",
		description:
			"Organized Linux Fest for open-source and Linux enthusiasts. Led BU Hacktoberfest to promote open-source contributions.",
		type: "volunteering",
		technologies: [
			"Open Source",
			"Linux",
			"Community Building",
			"Event Management",
		],
	},
	{
		id: 4,
		company: "Microsoft Learn Student Ambassadors",
		role: "Beta MLSA",
		period: "Sep 2023 - Present",
		logo: "/logos/mlsa.png",
		description:
			"Conducting workshops, mentoring students, and building a community around Microsoft technologies.",
		type: "volunteering",
		technologies: ["Azure", "Public Speaking", "Community Building"],
	},
	{
		id: 5,
		company: "CSI Bennett University",
		role: "Chief Technical Officer",
		period: "Aug 2023 - Aug 2024",
		logo: "/logos/csi.jpg",
		description:
			"Led technical initiatives and managed the tech team for university events and workshops.",
		type: "volunteering",
		technologies: ["Leadership", "Event Management", "Technical Planning"],
	},
	{
		id: 6,
		company: "GDSC Bennett University",
		role: "Tech Team Member",
		period: "Nov 2022 - Aug 2023",
		logo: "/logos/gdsc.svg",
		description: "Conducted events including the flagship Google Week.",
		type: "volunteering",
		technologies: ["Google Cloud", "Web Development"],
	},
];
