import { $choices, Choices } from "@/stores/choices.store";
import { useStore } from "@nanostores/solid";
import { createMemo, For, VoidProps } from "solid-js";

type NPMInstallListProps = {};

export default function NPMInstallList(props: VoidProps<NPMInstallListProps>) {
  const choices = useStore($choices);

  function getLibraries(_choices: Choices) {
    const libraries: { name: string; dev?: boolean }[] = [];

    if (!_choices) return [];

    // DATABASES
    if (_choices.databaseClient === "prisma") {
      libraries.push({ name: "prisma", dev: true });
      if (_choices.databaseClientEnhancement === "kysely") {
        libraries.push({ name: "kysely" });
        libraries.push({ name: "prisma-kysely", dev: true });

        if (_choices.database === "postgres") libraries.push({ name: "pg" });
        // if (_choices.database === "sqlite") libraries.push({ name: "prisma", dev: true });
        if (_choices.database === "libsql")
          libraries.push({ name: "@libsql/kysely-libsql", dev: true });
      } else {
        libraries.push({ name: "@prisma/client" });
      }
    }

    if (_choices.database === "postgres" && _choices.databaseClient === "postgres-js") {
      libraries.push({ name: "postgres" });
      if (_choices.databaseClientEnhancement === "kysely") {
        libraries.push({ name: "kysely" });
        libraries.push({ name: "kysely-postgres-js" });
      }
    }

    if (_choices.database === "sqlite" && _choices.databaseClient === "better-sqlite3") {
      libraries.push({ name: "better-sqlite3" });
      if (_choices.databaseClientEnhancement === "kysely") {
        libraries.push({ name: "kysely" });
      }
    }

    if (_choices.database === "libsql" && _choices.databaseClient === "libsql") {
      if (_choices.databaseClientEnhancement === "kysely") {
        libraries.push({ name: "kysely" });
        libraries.push({ name: "@libsql/kysely-libsql" });
      } else {
        libraries.push({ name: "@libsql/client" });
      }
    }

    if (_choices.database === "mongodb" && _choices.databaseClient === "mongodb") {
      libraries.push({ name: "mongodb" });
    }

    if (_choices.databaseClient === "drizzle") {
      libraries.push({ name: "drizzle-orm" });
      libraries.push({ name: "drizzle-kit", dev: true });
    }

    // SERVER FRAMEWORKS
    if (_choices.serverFramework === "hono") {
      libraries.push({ name: "hono" });
      if (_choices.serverFrameworkEnhancement === "trpc") {
        libraries.push({ name: "@trpc/server" });
        libraries.push({ name: "@trpc/client" });
        libraries.push({ name: "@hono/trpc-server" });
      }
    }
    if (_choices.serverFramework === "elysia") {
      libraries.push({ name: "elysia" });
      if (_choices.serverFrameworkEnhancement === "trpc") {
        libraries.push({ name: "@trpc/server" });
        libraries.push({ name: "@trpc/client" });
      }
    }
    if (_choices.serverFramework === "next") {
      libraries.push({ name: "next" });
      if (_choices.serverFrameworkEnhancement === "trpc") {
        libraries.push({ name: "@trpc/server" });
        libraries.push({ name: "@trpc/client" });
      }
    }
    if (_choices.serverFramework === "sveltekit") {
      libraries.push({ name: "@sveltejs/kit" });
      if (_choices.serverFrameworkEnhancement === "trpc") {
        libraries.push({ name: "@trpc/server" });
        libraries.push({ name: "@trpc/client" });
      }
    }
    if (_choices.serverFramework === "tanstackstart") {
      libraries.push({ name: "@tanstack/start" });
      if (_choices.serverFrameworkEnhancement === "trpc") {
        libraries.push({ name: "@trpc/server" });
        libraries.push({ name: "@trpc/client" });
      }
    }

    return libraries;
  }

  const libraries = createMemo(() => getLibraries(choices()));

  return (
    <div class="rounded-md bg-foreground text-muted p-4">
      <For each={libraries()}>
        {(library) => (
          <div>
            npm install {library.dev && "-D"} {library.name}
          </div>
        )}
      </For>
    </div>
  );
}
