export interface Achievement {
	id: number;
	title: string;
	award: string;
	subAward?: string;
	image: string;
	teammates?: string[];
}

export const achievements: Achievement[] = [
	{
		id: 1,
		title: "OnChain Summer Buildathon",
		award: "Discovery Track Winner",
		image: "/achievements/onchain.webp",
		teammates: ["Yash Raj", "Rakesh Sharma"],
	},
	{
		id: 2,
		title: "SheBuilds 2023",
		award: "Special Mention",
		image: "/achievements/185.webp",
		teammates: ["Yash Singh", "Vasvi Garg", "Pratibha Dureja"],
	},
	{
		id: 3,
		title: "Hedera Hello Future Hackathon",
		award: "2nd Runner Up in AI Track",
		image: "/achievements/hedera.png",
		teammates: [
			"Yash Raj",
			"Rakesh Sharma",
			"Urvashi Agarwal",
			"Harshita Malviya",
		],
	},
	{
		id: 4,
		title: "Hedera Hello Future 2 Hackathon",
		award: "2nd Runner Up",
		subAward: "Decentralized Identity and Verifiable Credentials Track",
		image: "/achievements/hedera.png",
		teammates: [
			"Yash Raj",
			"Rakesh Sharma",
			"Urvashi Agarwal",
			"Harshita Malviya",
		],
	},
	{
		id: 5,
		title: "EDU Chain Hackathon: Semester 3",
		award: "5th Place in Miscellaneous Track",
		image: "/achievements/educhain.png",
		teammates: ["Vansh", "Urvashi Agarwal"],
	},
	{
		id: 6,
		title: "HopperHacks 2024",
		award: "Best Diversity & Inclusion Hack",
		subAward: "Stony Brook University",
		image: "/achievements/hopperhacks.png",
		teammates: ["Yash Raj", "Aditya"],
	},
	{
		id: 7,
		title: "QubitX Hacks by YCW",
		award: "2nd Runner Up",
		image: "/achievements/qubit.png",
		teammates: ["Yash Raj", "Aditya"],
	},
	{
		id: 8,
		title: "HackCBS 6.0",
		award: "Domain track from GoDaddy",
		image: "/achievements/hackcbs6.webp",
		teammates: ["Khushi", "Ashish Kumar Verma"],
	},
	{
		id: 9,
		title: "VeChain Global Hackathon",
		award: "3rd Prize in Social Impact track",
		image:
			"https://cdn.dorahacks.io/static/files/199720adffaabc7cf9e5f444682829f9.png",
		teammates: ["Arnab Roy", "Sahil Nihalani"],
	},
];
