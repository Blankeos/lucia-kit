import {
  ServerFrameworkEnhancementOption,
  serverFrameworkEnhancements,
  serverFrameworks,
} from "@/lib/luciakit/options";
import {
  $choices,
  selectServerFramework,
  selectServerFrameworkEnhancement,
} from "@/stores/choices.store";
import { existsInObject } from "@/utils/existsInObject";
import { useStore } from "@nanostores/solid";
import { For, VoidProps } from "solid-js";
import { Button } from "../ui/button";

type ServerFrameworkOptions = {};

export default function ServerFrameworkOptions(props: VoidProps<ServerFrameworkOptions>) {
  const choices = useStore($choices);

  function serverFrameworkEnhancementIsDisabled(option: ServerFrameworkEnhancementOption) {
    const serverFramework = choices()?.serverFramework;
    if (!serverFramework) return true; // disable.
    if (existsInObject(option.serverFrameworks, serverFramework)) return false; // allow
    return true;
  }
  return (
    <div class="flex gap-1">
      <For each={serverFrameworks}>
        {(item) => (
          <Button
            variant={choices().serverFramework === item.id ? "default" : "secondary"}
            onClick={() => {
              selectServerFramework(item.id);
            }}
          >
            {item.name}
          </Button>
        )}
      </For>
      <For each={serverFrameworkEnhancements}>
        {(item) => (
          <Button
            disabled={serverFrameworkEnhancementIsDisabled(item)}
            variant={choices().serverFrameworkEnhancement === item.id ? "default" : "secondary"}
            onClick={() => {
              selectServerFrameworkEnhancement(item.id);
            }}
          >
            {item.name}
          </Button>
        )}
      </For>
    </div>
  );
}
