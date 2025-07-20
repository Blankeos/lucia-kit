import { privateConfig } from "@/config.private";

import { Hono } from "hono";

import { appRouter } from "@/server/_app";
import { apply } from "vike-server/hono";
import { serve } from "vike-server/hono/serve";

const app = new Hono();

// Health checks
app.get("/up", async (c) => {
  return c.newResponse("🟢 UP", { status: 200 });
});

// For the Backend APIs
app.route("/api", appRouter);

// Vike
apply(app, {
  pageContext: (c) => {
    const pageContextInit = {
      urlOriginal: c.hono.req.url,
      request: c.hono.req,
      response: c.hono.res,
    };

    return pageContextInit;
  },
});

// Returning errors.
app.onError((_, c) => {
  return c.json(
    {
      error: {
        message: c.error?.message ?? "Something went wrong.",
      },
    },
    500
  );
});

console.log("Running at http://localhost:" + privateConfig.PORT);

// No need to export default (especially Bun).
serve(app, { port: privateConfig.PORT });
