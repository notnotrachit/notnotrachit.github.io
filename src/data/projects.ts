export interface Project {
	id: number;
	title: string;
	shortDescription: string;
	description: string;
	image: string | null;
	link: string | null;
	github: string | null;
	techStack: string[];
	featured: boolean;
}

export const projects: Project[] = [
	{
		id: 12,
		title: "Ryla",
		shortDescription: "AI-powered Basecamp project management Slack bot",
		description:
			"An AI-powered bot that lets you control all your project management tasks on Basecamp using natural language.",
		image: "https://utfs.io/f/9O0rMFCPJMcpdYvlZHhBWDvgVprsALXlhuE26dznQfMiJkja",
		link: "https://ryla.rcht.dev",
		github: null,
		techStack: ["NextJS", "Convex", "Python"],
		featured: true,
	},
	{
		id: 11,
		title: "Jist",
		shortDescription: "AI powered notification manager",
		description:
			"An intelligent Android application that uses AI to manage, prioritize, and summarize notifications, helping users stay focused on what matters most.",
		image: "https://utfs.io/f/9O0rMFCPJMcpnT2n8vBflLz1K8xM2Fg45kaTOCnce96ih30N",
		link: null,
		github: "https://github.com/notnotrachit/jist",
		techStack: ["Kotlin", "Android", "Jetpack Compose"],
		featured: true,
	},
	{
		id: 10,
		title: "Owwn",
		shortDescription: "An expense spliiting web app",
		description: "An expense splitting web app built with Tanstack and Convex.",
		image:
			"https://tv6akf8u5k.ufs.sh/f/9O0rMFCPJMcpS3PNLu0n7RvgQb3DkyYozBdOIKaGZE2CuwJL",
		link: "https://owwn.rcht.dev/",
		github: "https://github.com/notnotrachit/owwn",
		techStack: ["Tanstack", "Convex"],
		featured: true,
	},
	{
		id: 1,
		title: "QuizVerse",
		shortDescription: "Decentralized AI Quizzing Platform",
		description:
			"Empowering quizzes with AI on a decentralized platform. An AI powered quizing platform built on blockchain technology.",
		image: "https://i.imgur.com/BGoAuMu.png",
		link: null,
		github: "https://github.com/notnotrachit/QuizVerse/",
		techStack: ["NextJS", "Solidity", "Hedera", "AI"],
		featured: true,
	},
	{
		id: 2,
		title: "Sharepal",
		shortDescription: "Group Expense Splitting App",
		description: "A simple group expense splitting platform.",
		image: "https://utfs.io/f/9O0rMFCPJMcpFRi8Dglk5yu76GRCelsc8BANFhofn12vZJbx",
		link: null,
		github: "https://github.com/notnotrachit/sharepal",
		techStack: ["GoLang", "React Native", "MongoDB", "S3"],
		featured: true,
	},
	{
		id: 3,
		title: "Re-Dcrypt",
		shortDescription: "Cryptic Hunt Platform",
		description: "A full stack web platform for organising cryptic hunt.",
		image:
			"https://tv6akf8u5k.ufs.sh/f/9O0rMFCPJMcp5F05Y71P5lqCSUGKRi7f1QOEXdDyHI9JshWY",
		link: null,
		github: "https://github.com/Re-Dcrypt/redcrypt",
		techStack: ["Python", "Django", "HTML", "CSS", "Tailwind", "Javascript"],
		featured: true,
	},
	{
		id: 4,
		title: "Cryptforces",
		shortDescription: "Learn Cryptic Hunting",
		description: "A platform that helps people learn cryptic hunting.",
		image: "/projects/cryptforces.png",
		link: null,
		github: "https://github.com/itsnishitjain/cryptforces",
		techStack: ["Python", "Django", "HTML", "CSS", "Tailwind"],
		featured: false,
	},
	{
		id: 5,
		title: "Google Week Event Page",
		shortDescription: "Event Landing Page",
		description: "Landing page for the Google Week event organized by GDSC BU.",
		image:
			"https://cloud.appwrite.io/v1/storage/buckets/647080af0e056dcab189/files/64750f62bee6b7730313/view?project=64707ef1e67c12fddb64&mode=admin",
		link: null,
		github: "https://github.com/notnotrachit/google-week-gdsc",
		techStack: ["HTML", "CSS", "Tailwind"],
		featured: false,
	},
	{
		id: 6,
		title: "ClubKonnect",
		shortDescription: "Community Recruitment Platform",
		description:
			"A complete platform for recruiting members for a club or community with GitHub & LinkedIn OAuth.",
		image: "https://i.imgur.com/GNSoGVa.png",
		link: null,
		github: "https://github.com/notnotrachit/ClubKonnect",
		techStack: ["Python", "Django", "HTML", "CSS", "Tailwind"],
		featured: true,
	},
	{
		id: 7,
		title: "DevCompete",
		shortDescription: "1v1 Coding Contests",
		description: "A 1v1 Coding Contest Platform.",
		image: "https://utfs.io/f/9O0rMFCPJMcpKjoG8Nd3gypkwqlJiHeG6ZDuzvbU2RdaofQF",
		link: null,
		github: "https://github.com/notnotrachit/devcompete",
		techStack: ["Python", "Django", "Azure", "MySQL", "Redis"],
		featured: true,
	},
	{
		id: 8,
		title: "UniMart",
		shortDescription: "Student Marketplace",
		description:
			"The student marketplace to buy, sell & rent second hand things without postage or packaging.",
		image: "https://i.imgur.com/ZpDMSxu.png",
		link: null,
		github: "https://github.com/notnotrachit/unimart",
		techStack: ["Django", "Python", "HTML", "CSS", "Tailwind"],
		featured: false,
	},
	{
		id: 9,
		title: "Dish Discover",
		shortDescription: "Recipe Sharing App",
		description: "A platform for discovering and sharing interesting recipes.",
		image:
			"https://cloud.appwrite.io/v1/storage/buckets/647080af0e056dcab189/files/64905017c4010712133e/view?project=64707ef1e67c12fddb64&mode=admin",
		link: null,
		github: "https://github.com/notnotrachit/DishDiscovery",
		techStack: ["Python", "Django", "Tailwind", "DaisyUI"],
		featured: false,
	},
];
