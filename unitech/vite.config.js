import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		host: true, // Listen on all local network IPs (0.0.0.0)
		port: 5173, // Optional: default port, can be changed
		strictPort: true, // Optional: ensures the port won't change automatically
	},
});
