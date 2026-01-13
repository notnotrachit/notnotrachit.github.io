import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		<div className="w-full h-screen flex flex-col items-center justify-center bg-[#020617] text-white">
			<h1 className="font-display text-9xl font-bold mb-4 text-cyan-500">404</h1>
			<p className="font-body text-xl text-cyan-400/60 mb-8">Page not found</p>
			<Link
				to="/"
				className="px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 rounded-full font-mono text-sm transition-colors"
			>
				Return Home
			</Link>
		</div>
	);
}
