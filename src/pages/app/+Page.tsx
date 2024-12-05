import DatabaseClientOptions from "@/components/app/database-client-options";
import DatabaseOptions from "@/components/app/database-options";
import NPMInstallList from "@/components/app/npm-install-list";
import ServerFrameworkOptions from "@/components/app/server-framework-options";
import { $choices } from "@/stores/choices.store";
import { useStore } from "@nanostores/solid";
import { useMetadata } from "vike-metadata-solid";

export default function AppPage() {
  useMetadata({
    title: "App",
  });

  const choices = useStore($choices);

  return (
    <>
      {JSON.stringify(choices())}
      <p>Database</p>
      <DatabaseOptions />

      <div class="h-2" />

      <p>Database Client</p>
      <DatabaseClientOptions />

      <div class="h-2" />

      <p>Server Framework</p>
      <ServerFrameworkOptions />

      <div class="px-2">
        <NPMInstallList />
      </div>

      <div class="px-2"></div>
    </>
  );
}
