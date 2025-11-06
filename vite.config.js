import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@design": path.resolve(__dirname, "./src/components/design"),
      "@functional": path.resolve(__dirname, "./src/components/functional"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@api": path.resolve(__dirname, "./src/core/api"),
      "@modules": path.resolve(__dirname, "./src/core/modules"),
    },
  },
});
