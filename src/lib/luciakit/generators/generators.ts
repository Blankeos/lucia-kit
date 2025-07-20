// Outputs
// package.json
// src/
//   private-env.ts
// .env.example
// .env
export function dbSchema(params: {
  dbTechChoices: {
    database: "";
    dbClient: "";
    enhancements: "";
  };
  authStrategies: {};
}) {}

// Depends: auth.utils.ts (generateId but via interface), dbschema.
// Outputs:
//   auth.dao.ts
export function dao(params: { dbTechChoices: {}; authStrategies: {} }) {}

// Depends: auth.dao.ts
// Outputs:
//   auth.service.ts
//    - *authStrategies
export function services() {}

// PICK SERVER TECH

// Outputs:
//   auth.utils.ts
//     - generateId
//     - setSessionTokenCookie
//     - deleteSessionTokenCookie
export function authUtils() {}

// Depends: auth.utils.ts, auth.dao.ts, auth.service.ts
// Outputs:
//   auth.middleware.ts
//     - authedMiddleware
//     - protectedMiddleware
export function middlewares() {}

// Depends: auth.utils.ts, auth.dao.ts, auth.service.ts, auth.middleware.ts
// Outputs:
//   auth.utils.ts (setSessionTokenCookie & deleteSessionTokenCookie interface)
//   auth.controller.ts
export function controllers() {}

// Outputs:
//   features/
//     components/
//       protected-route.tsx
//       auth.demo.tsx
//     contexts/
//       auth.context.tsx
export function authClient() {}
