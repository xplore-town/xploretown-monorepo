import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    watch: {
      ignored: ["!**/node_modules/@exploresg.frontend/**"],
    },
  },
  optimizeDeps: {
    exclude: ["@exploresg.frontend/ui"],
  },
  resolve: {
    alias: {
      "@exploresg.frontend/ui": path.resolve(
        __dirname,
        "../../packages/ui/src",
      ),
    },
  },
});
