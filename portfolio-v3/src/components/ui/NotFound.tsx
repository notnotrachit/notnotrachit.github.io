import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		<div className="w-full h-screen flex flex-col items-center justify-center bg-[#0f0c29] text-white">
			<h1 className="font-display text-9xl font-bold mb-4">404</h1>
			<p className="font-body text-xl text-neutral-400 mb-8">Page not found</p>
			<Link
				to="/"
				className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-mono text-sm transition-colors"
			>
				Return Home
			</Link>
		</div>
	);
}
