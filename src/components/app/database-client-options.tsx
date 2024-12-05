import {
  DatabaseClientEnhancementOption,
  databaseClientEnhancements,
  DatabaseClientOption,
  databaseClients,
} from "@/lib/luciakit/options";
import {
  $choices,
  selectDatabaseClient,
  selectDatabaseClientEnhancement,
} from "@/stores/choices.store";
import { existsInObject } from "@/utils/existsInObject";
import { useStore } from "@nanostores/solid";
import { For, VoidProps } from "solid-js";
import { Button } from "../ui/button";

type DatabaseClientOptionsProps = {};

export default function DatabaseClientOptions(_props: VoidProps<DatabaseClientOptionsProps>) {
  const choices = useStore($choices);

  function databaseClientIsDisabled(option: DatabaseClientOption) {
    const database = choices()?.database;
    if (!database) return true; // allow to select.
    if (existsInObject(option.databases, database)) return false; // allow to select.
    return true;
  }
  function databaseEnhancementIsDisabled(option: DatabaseClientEnhancementOption) {
    const database = choices()?.database;
    const databaseClient = choices()?.databaseClient;

    if (!database) return true; // disable
    if (!databaseClient) return true; // disable

    if (
      existsInObject(option.databases, database) &&
      existsInObject(option.databaseClients, databaseClient)
    )
      return false; // allow to select.

    return true;
  }
  return (
    <div class="flex gap-1">
      <For each={databaseClients}>
        {(item) => (
          <Button
            disabled={databaseClientIsDisabled(item)}
            variant={choices().databaseClient === item.id ? "default" : "secondary"}
            onClick={() => {
              selectDatabaseClient(item.id);
            }}
          >
            {item.name}
          </Button>
        )}
      </For>
      <For each={databaseClientEnhancements}>
        {(item) => (
          <Button
            disabled={databaseEnhancementIsDisabled(item)}
            variant={choices().databaseClientEnhancement === item.id ? "default" : "secondary"}
            onClick={() => {
              selectDatabaseClientEnhancement(item.id);
            }}
          >
            {item.name}
          </Button>
        )}
      </For>
    </div>
  );
}
