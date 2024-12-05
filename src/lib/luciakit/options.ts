/**
 * Determines:
 * - Schemas
 */
export const databases = [
  {
    id: "postgres",
    name: "PostgreSQL",
  },
  {
    id: "sqlite",
    name: "SQLite",
  },
  {
    id: "libsql",
    name: "LibSQL",
  },
  {
    id: "mongodb",
    name: "MongoDB",
  },
] as const;
export type DatabaseOption = (typeof databases)[number];
export type Database = (typeof databases)[number]["id"];

/**
 * Determines:
 * - Migrations
 * - DAOs
 * - Lib Clients
 * - Package.json scripts
 */
export const databaseClients = [
  {
    id: "prisma",
    name: "Prisma",
    databases: {
      postgres: true,
      sqlite: true,
      mongodb: true,
      libsql: true,
    },
  },
  {
    id: "drizzle",
    name: "Drizzle",
    databases: {
      postgres: true,
      sqlite: true,
      libsql: true,
    },
  },
  {
    id: "postgres-js",
    name: "Postgres.js",
    databases: {
      postgres: true,
    },
  },
  {
    id: "better-sqlite3",
    name: "better-sqlite3",
    databases: {
      sqlite: true,
    },
  },
  {
    id: "libsql",
    name: "LibSQL Driver",
    databases: {
      libsql: true,
    },
  },
  {
    id: "mongodb",
    name: "MongoDB Driver",
    databases: {
      mongodb: true,
    },
  },
] as const;
export type DatabaseClientOption = (typeof databaseClients)[number];
export type DatabaseClient = (typeof databaseClients)[number]["id"];

export const databaseClientEnhancements = [
  {
    id: "kysely",
    name: "Kysely",
    databases: {
      postgres: true,
      sqlite: true,
      libsql: true,
    },
    databaseClients: {
      prisma: true,
      drizzle: true,
      "postgres-js": true,
      "better-sqlite3": true,
      libsql: true,
    },
  },
] as const;
export type DatabaseClientEnhancementOption = (typeof databaseClientEnhancements)[number];
export type DatabaseClientEnhancement = (typeof databaseClientEnhancements)[number]["id"];

/**
 * Determines
 * - API Controllers
 * - API Services
 */
export const serverFrameworks = [
  {
    id: "hono",
    name: "Hono",
  },
  {
    id: "elysia",
    name: "Elysia",
  },
  {
    id: "next",
    name: "Next.js",
  },
  {
    id: "sveltekit",
    name: "SvelteKit",
  },
  {
    id: "tanstackstart",
    name: "TanStack Start",
  },
] as const;
export type ServerFrameworkOption = (typeof serverFrameworks)[number];
export type ServerFramework = (typeof serverFrameworks)[number]["id"];

export const serverFrameworkEnhancements = [
  {
    id: "trpc",
    name: "tRPC",
    serverFrameworks: {
      hono: true,
      elysia: true,
      next: true,
      sveltekit: true,
      tanstackstart: true,
    },
  },
];
export type ServerFrameworkEnhancementOption = (typeof serverFrameworkEnhancements)[number];
export type ServerFrameworkEnhancement = (typeof serverFrameworkEnhancements)[number]["id"];

/**
 * Only implement the
 * - auth.context.tsx
 * - protected-layout.tsx
 */
export const frontendFrameworks = [
  {
    id: "solidjs",
  },
  {
    id: "svelte",
    server: {
      sveltekit: true,
    },
  },
  {
    id: "react",
    server: {
      next: true,
      hono: true,
      elysia: true,
    },
  },
  {
    id: "vue",
  },
  {
    id: "vike",
  },
];
export type FrontendFrameworkOption = (typeof frontendFrameworks)[number];
export type FrontendFramework = (typeof frontendFrameworks)[number]["id"];

/**
 *
 */

// Implement in the future only.
// export const frontBackSeparation = [
//   {
//     id: "single-server",
//     description: "Frontend will be served next to the backend.",
//     serverFrameworks: {
//       hono: true,
//       elysia: true,
//       next: true,
//     },
//   },
//   {
//     id: "multi-server",
//   },
// ];
