import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    port: 3002,
    watch: {
      ignored: ["!**/node_modules/@exploresg.frontend/**"],
    },
  },
  optimizeDeps: {
    exclude: ["@exploresg.frontend/ui", "@exploresg.frontend/utils"],
  },
  resolve: {
    alias: {
      "@exploresg.frontend/ui/styles": path.resolve(__dirname, "../../packages/ui/src/styles.css"),
      "@exploresg.frontend/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@exploresg.frontend/utils": path.resolve(__dirname, "../../packages/utils/src"),
    },
  },
});
