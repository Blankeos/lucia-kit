import vikeServer from "vike-server/config";
import config from "vike-solid/config";
import type { Config } from "vike/types";

// Default config (can be overridden by pages)
export default {
  extends: [config, vikeServer],
  prerender: true,
  server: {
    entry: "./src/server/server.ts",
    // We use this because Bun/Deno don't have hmr for server-side in dev at the moment.
    hmr: "prefer-restart",
  },
} satisfies Config;
