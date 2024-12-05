import {
  Database,
  DatabaseClient,
  DatabaseClientEnhancement,
  FrontendFramework,
  ServerFramework,
  ServerFrameworkEnhancement,
} from "@/lib/luciakit/options";
import { map } from "nanostores";

export type Choices = {
  database?: Database;
  databaseClient?: DatabaseClient;
  databaseClientEnhancement?: DatabaseClientEnhancement;
  serverFramework?: ServerFramework;
  serverFrameworkEnhancement?: ServerFrameworkEnhancement;
  frontendFramework?: FrontendFramework;
};

export const $choices = map<Choices>({});

// ===========================================================================
// Mutations
// ===========================================================================
export function selectDatabase(database: Database) {
  $choices.setKey("database", database);
  $choices.setKey("databaseClient", undefined);
  $choices.setKey("databaseClientEnhancement", undefined);
}

export function selectDatabaseClient(databaseClient: DatabaseClient) {
  if ($choices.get().databaseClient === databaseClient) return;
  $choices.setKey("databaseClient", databaseClient);
}

export function selectDatabaseClientEnhancement(
  databaseClientEnhancement: DatabaseClientEnhancement
) {
  if ($choices.get().databaseClientEnhancement === databaseClientEnhancement) return;
  $choices.setKey("databaseClientEnhancement", databaseClientEnhancement);
}

export function selectServerFramework(serverFramework: ServerFramework) {
  if ($choices.get().serverFramework === serverFramework) return;
  $choices.setKey("serverFramework", serverFramework);
  $choices.setKey("serverFrameworkEnhancement", undefined);
}

export function selectServerFrameworkEnhancement(
  serverFrameworkEnhancement: ServerFrameworkEnhancement
) {
  if ($choices.get().serverFrameworkEnhancement === serverFrameworkEnhancement) return;
  $choices.setKey("serverFrameworkEnhancement", serverFrameworkEnhancement);
}

export function selectFrontendFramework(frontendFramework: FrontendFramework) {
  $choices.setKey("frontendFramework", frontendFramework);
}

// ===========================================================================
// Getters
// ===========================================================================
