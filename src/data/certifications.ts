export interface Certification {
	id: number;
	name: string;
	issuingAuthority: string;
	issuedOn: string;
	credentialUrl: string;
	imageUrl?: string | null;
	verified: boolean;
}

export const certifications: Certification[] = [
	{
		id: 1,
		name: "AWS Certified Cloud Practitioner",
		issuingAuthority: "Amazon Web Services",
		issuedOn: "2024-04-27",
		credentialUrl:
			"https://www.credly.com/badges/435b1a30-5f35-4341-a33b-d5a484824583/public_url",
		imageUrl:
			"https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
		verified: true,
	},
	{
		id: 2,
		name: "Microsoft Certified: Azure Fundamentals",
		issuingAuthority: "Microsoft",
		issuedOn: "2024-05-21",
		credentialUrl:
			"https://learn.microsoft.com/api/credentials/share/en-us/rachitkhurana/2F60BD77D3400407?sharingId=D0D3E854FCDD3D94",
		verified: true,
	},
	{
		id: 3,
		name: "Google IT Automation with Python",
		issuingAuthority: "Grow With Google",
		issuedOn: "2023-04-04",
		credentialUrl:
			"https://www.coursera.org/account/accomplishments/specialization/certificate/ELE2UKYHP4HQ",
		verified: true,
	},
	{
		id: 4,
		name: "Introduction to Computers and Operating Systems and Security",
		issuingAuthority: "Microsoft",
		issuedOn: "2024-02-19",
		credentialUrl:
			"https://www.coursera.org/account/accomplishments/records/5Y6ZMZNFBBBH",
		verified: true,
	},
	{
		id: 5,
		name: "The Bits and Bytes of Computer Networking",
		issuingAuthority: "Google",
		issuedOn: "2024-02-21",
		credentialUrl: "https://coursera.org/verify/F4GARCTVDKDS",
		verified: true,
	},
];
