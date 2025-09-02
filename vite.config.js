import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "/Weather-api", // 👈 must match GitHub Pages repo or subpath
});
