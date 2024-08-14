import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/super-duper-guide/",
  plugins: [react()],
  resolve: {
    /* shacdn -> tailwind */
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
