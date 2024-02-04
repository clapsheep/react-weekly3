import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
    open: true,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
