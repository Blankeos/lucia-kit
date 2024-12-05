import { databases } from "@/lib/luciakit/options";
import { $choices, selectDatabase } from "@/stores/choices.store";
import { useStore } from "@nanostores/solid";
import { For, VoidProps } from "solid-js";
import { Button } from "../ui/button";

type DatabaseOptionsProps = {
  selected?: string;
};

export default function DatabaseOptions(props: VoidProps<DatabaseOptionsProps>) {
  const choices = useStore($choices);

  return (
    <div class="flex gap-1">
      <For each={databases}>
        {(item) => (
          <Button
            onClick={() => {
              selectDatabase(item.id);
            }}
            variant={choices().database === item.id ? "default" : "secondary"}
          >
            {item.name}
          </Button>
        )}
      </For>
    </div>
  );
}
