import { macaronVitePlugin } from "@macaron-css/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [macaronVitePlugin(), solidPlugin()],
  server: {
    port: 3000,
  },
});
