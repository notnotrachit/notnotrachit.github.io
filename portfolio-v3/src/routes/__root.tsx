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
				title: "Rachit | Creative Developer",
			},
		],
		links: [{ rel: "stylesheet", href: appCss }],
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
			<body>
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
