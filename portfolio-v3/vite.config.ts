import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
	plugins: [
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
	server: {
	  allowedHosts: ["builder.rcht.dev", "localhost"],
		fs: {
			allow: [
				// Allow serving files from one level up (project root)
				path.resolve(__dirname, ".."),
			],
		},
	},
	resolve: {
		alias: {
			// Polyfill node:async_hooks for browser
			"node:async_hooks": path.resolve(__dirname, "src/polyfills/async-hooks.ts"),
		},
	},
});

export default config;
