import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from 'path';
export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    open: true, // bu satır tarayıcıyı açar
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'), //"app" klasörüne işaret etmeli
    },
  },
});

