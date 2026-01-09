export interface Project {
	id: number;
	title: string;
	description: string;
	image: string | null;
	link: string | null;
	github: string | null;
	techStack: string[];
	featured: boolean;
}

export const projects: Project[] = [
	{
		id: 1,
		title: "QuizVerse",
		description:
			"Empowering quizzes with AI on a decentralized platform. An AI powered quizing platform built on blockchain technology.",
		image: "https://i.imgur.com/BGoAuMu.png",
		link: "https://quizverse3.vercel.app/",
		github: "https://github.com/notnotrachit/QuizVerse/",
		techStack: ["NextJS", "Solidity", "Hedera", "AI"],
		featured: true,
	},
	{
		id: 2,
		title: "Sharepal",
		description: "A simple group expense splitting platform.",
		image:
			"https://fra.cloud.appwrite.io/v1/storage/buckets/647080af0e056dcab189/files/687e7c4d002b3f558a00/view?project=64707ef1e67c12fddb64&mode=admin",
		link: null,
		github: "https://github.com/notnotrachit/sharepal",
		techStack: ["GoLang", "React Native", "MongoDB", "S3"],
		featured: true,
	},
	{
		id: 3,
		title: "Re-Dcrypt",
		description: "A full stack web platform for organising cryptic hunt.",
		image: "/projects/redcrypt.png",
		link: "https://redcrypt.azurewebsites.net/",
		github: "https://github.com/Re-Dcrypt/redcrypt",
		techStack: ["Python", "Django", "HTML", "CSS", "Tailwind", "Javascript"],
		featured: true,
	},
	{
		id: 4,
		title: "Cryptforces",
		description: "A platform that helps people learn cryptic hunting.",
		image: "/projects/cryptforces.png",
		link: "https://www.cryptforces.xyz/",
		github: "https://github.com/itsnishitjain/cryptforces",
		techStack: ["Python", "Django", "HTML", "CSS", "Tailwind"],
		featured: false,
	},
	{
		id: 5,
		title: "Google Week Event Page",
		description: "Landing page for the Google Week event organized by GDSC BU.",
		image:
			"https://cloud.appwrite.io/v1/storage/buckets/647080af0e056dcab189/files/64750f62bee6b7730313/view?project=64707ef1e67c12fddb64&mode=admin",
		link: "https://googleweek.gdscbu.club/",
		github: "https://github.com/notnotrachit/google-week-gdsc",
		techStack: ["HTML", "CSS", "Tailwind"],
		featured: false,
	},
	{
		id: 6,
		title: "ClubKonnect",
		description:
			"A complete platform for recruiting members for a club or community with GitHub & LinkedIn OAuth.",
		image: "https://i.imgur.com/GNSoGVa.png",
		link: "https://clubkonnect.vercel.app/",
		github: "https://github.com/notnotrachit/ClubKonnect",
		techStack: ["Python", "Django", "HTML", "CSS", "Tailwind"],
		featured: false,
	},
	{
		id: 7,
		title: "DevCompete",
		description: "A 1v1 Coding Contest Platform.",
		image:
			"https://cloud.appwrite.io/v1/storage/buckets/647080af0e056dcab189/files/656f04bc080d4cf614d6/view?project=64707ef1e67c12fddb64&mode=admin",
		link: "https://devcompete.azurewebsites.net/",
		github: "https://github.com/notnotrachit/devcompete",
		techStack: ["Python", "Django", "Azure", "MySQL", "Redis"],
		featured: false,
	},
	{
		id: 8,
		title: "UniMart",
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
		description: "A platform for discovering and sharing interesting recipes.",
		image:
			"https://cloud.appwrite.io/v1/storage/buckets/647080af0e056dcab189/files/64905017c4010712133e/view?project=64707ef1e67c12fddb64&mode=admin",
		link: "https://dish-discovery.vercel.app/",
		github: "https://github.com/notnotrachit/DishDiscovery",
		techStack: ["Python", "Django", "Tailwind", "DaisyUI"],
		featured: false,
	},
];
