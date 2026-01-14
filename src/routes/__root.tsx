import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SmoothScroll } from "../components/SmoothScroll";
import { CustomCursor } from "../components/ui/CustomCursor";
import { Navbar } from "../components/ui/Navbar";
import { NotFound } from "../components/ui/NotFound";
import appCss from "../index.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Rachit Khurana - Full Stack Developer",
			},
			{
				name: "description",
				content:
					"Full Stack Developer specializing in React, Next.js, Python, and Web3. Lead at FOSS Club Bennett University & Microsoft Learn Student Ambassador.",
			},
			{
				name: "keywords",
				content:
					"Full Stack Developer, React, Next.js, Python, Web3, JavaScript, Golang, React Native, Portfolio",
			},
			{
				name: "google-site-verification",
				content: "zqYE4zRgKDrWS1JQzTGYub-w6p8EsdBN71nyGr_Mpb8",
			},
			// Open Graph
			{
				property: "og:title",
				content: "Rachit Khurana - Full Stack Developer",
			},
			{
				property: "og:description",
				content:
					"Full Stack Developer specializing in React, Next.js, Python, and Web3",
			},
			{
				property: "og:url",
				content: "https://rachitkhurana.tech/",
			},
			{
				property: "og:site_name",
				content: "Rachit Khurana",
			},
			{
				property: "og:locale",
				content: "en_US",
			},
			{
				property: "og:image",
				content: "https://rachitkhurana.tech/profile.jpg",
			},
			{
				property: "og:image:width",
				content: "1200",
			},
			{
				property: "og:image:height",
				content: "630",
			},
			{
				property: "og:image:alt",
				content: "Rachit Khurana",
			},
			{
				property: "og:type",
				content: "website",
			},
			// Twitter
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:creator",
				content: "@notnotrachit",
			},
			{
				name: "twitter:title",
				content: "Rachit Khurana - Full Stack Developer",
			},
			{
				name: "twitter:description",
				content:
					"Full Stack Developer specializing in React, Next.js, Python, and Web3",
			},
			{
				name: "twitter:image",
				content: "https://rachitkhurana.tech/profile.jpg",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.ico", type: "image/x-icon", sizes: "any" },
			{ rel: "icon", href: "/profile.jpg", sizes: "any" },
			{ rel: "me", href: "https://mastodon.social/@notnotrachit" },
		],
		scripts: [
			{
				src: "https://www.googletagmanager.com/gtag/js?id=G-YG4LM0HFDQ",
				async: true,
			},
			{
				children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-YG4LM0HFDQ');`,
			},
		],
	}),
	component: RootComponent,
	notFoundComponent: NotFound,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="selection:bg-cyan-500/30 selection:text-cyan-200">
				{/* Background Blobs Container - Isolated to prevent scroll issues */}
				<div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1] bg-[linear-gradient(-45deg,#020617,#0f172a,#172554)] bg-[length:400%_400%] animate-gradient-bg">
					<div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(6,182,212,0.15)_0%,rgba(0,0,0,0)_70%)] animate-float" />
					<div className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,rgba(0,0,0,0)_70%)] animate-float-reverse" />
				</div>

				<div id="root">
					<SmoothScroll />
					<CustomCursor />
					<Navbar />
					{children}
				</div>
				<Scripts />
			</body>
		</html>
	);
}
