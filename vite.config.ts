import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/super-duper-guide/",
  plugins: [react(), tailwindcss()],
  resolve: {
    /* shacdn -> tailwind */
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
