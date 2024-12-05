// Hono
import devServer from "@hono/vite-dev-server";

// Vike
import vikeSolid from "vike-solid/vite";
import vike from "vike/plugin";

// Vite
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    devServer({
      entry: "./src/server/server.ts",

      exclude: [
        /^\/@.+$/,
        /.*\.(ts|tsx|vue)($|\?)/,
        /.*\.(s?css|less)($|\?)/,
        /^\/favicon\.ico$/,
        /.*\.(svg|png)($|\?)/,
        /^\/(public|assets|static)\/.+/,
        /^\/node_modules\/.*/,
      ],

      injectClientScript: false,
    }),
    vike({}),
    vikeSolid(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
