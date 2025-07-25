import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { authController } from "./modules/auth/auth.controller";
import { todosController } from "./modules/todos/todos.controller";

const app = new Hono();

app.use(csrf());

import { handlebarsHelpers } from "@/lib/luciakit/_handlebars-helpers";
import { GenerationSchema } from "@/lib/luciakit/options";

/**
 * The base router. Include all the routes here from `./routes/*`
 */
export const appRouter = app
  .route("/", authController)
  .route("/", todosController)
  .get("/generate", async (c) => {
    // Using dynamic imports to keep dependencies inside the handler for this example.
    // In a real application, these should be top-level static imports.
    const Handlebars = (await import("handlebars")).default;
    handlebarsHelpers(Handlebars);

    const { glob } = await import("glob");
    const path = (await import("node:path")).default;
    const fs = (await import("node:fs/promises")).default;

    const query = c.req.query();

    // @ts-ignore
    const context: GenerationSchema = {
      ...query,
    };
    console.log(context);

    // Find all template files in the generators directory.
    const generatorsDir = path.resolve(process.cwd(), "src/lib/luciakit/generators");
    const templatePaths = await glob(`${generatorsDir}/**/*.*`, { nodir: true });

    const generatedFiles = {};
    const filenameRegex = /^\s*\/\/\/\/filename:\s*(.*)\r?\n/;

    console.log("template paths", templatePaths);
    for (const templatePath of templatePaths) {
      const templateName = path.basename(templatePath);
      // Skip helper files or partials which are not meant to be generated directly.
      if (templateName.startsWith("_")) {
        continue;
      }

      try {
        const templateContent = await fs.readFile(templatePath, "utf-8");
        const compile = Handlebars.compile(templateContent, { noEscape: true });
        const generatedContent = compile(context);

        const match = generatedContent.match(filenameRegex);

        if (match) {
          const filePath = match[1].trim();
          const content = generatedContent.substring(match[0].length);

          // @ts-ignore
          generatedFiles[templateName] = {
            "file-path": filePath,
            content: content,
          };
        }
      } catch (error) {
        const err = error as Error;
        console.error(`Error processing template ${templatePath}:`, err);
        return c.json(
          { error: `Failed to process template ${templateName}`, details: err.message },
          500
        );
      }
    }

    return c.json(generatedFiles);
  });

export type AppRouter = typeof appRouter;
