export interface EducationItem {
	id: number;
	school: string;
	degree: string;
	period: string;
	details: string;
	logo: string;
}

export const education: EducationItem[] = [
	{
		id: 1,
		school: "Bennett University",
		degree: "BTech CSE",
		period: "2022 - 2026",
		details: "Ongoing",
		logo: "/logos/bennett.png",
	},
	{
		id: 2,
		school: "Sardar Patel Vidyalaya",
		degree: "XI - XII",
		period: "2020 - 2022",
		details: "XII Boards - 84.8%",
		logo: "/logos/spv.jpg",
	},
	{
		id: 3,
		school: "Apeejay School Noida",
		degree: "Nursery - X",
		period: "2008 - 2020",
		details: "X Boards - 90.2%",
		logo: "/logos/apeejay.jpg",
	},
];
