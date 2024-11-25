import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@features": path.resolve(__dirname, "./src/features"),
      "@config": path.resolve(__dirname, "./src/app/config"),
      "@hooks": path.resolve(__dirname, "./src/app/hooks"),
    },
  },
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
  ],
});
