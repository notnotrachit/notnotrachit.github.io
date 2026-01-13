import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
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
		nitro(),
		viteReact(),
	],
	server: {
		allowedHosts: ["builder.rcht.dev", "localhost"],
		proxy: {
			"/api/wakapi-proxy": {
				target: "https://wakapi.rachitkhurana.tech",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/wakapi-proxy/, "/api"),
			},
		},
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
