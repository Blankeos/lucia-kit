import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SelectComp } from "@/components/ui/select";
import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { FileNode, generateFileStructure, StackConfig } from "../../lib/get-file-structure";
// import {
//   Braces,
//   ChevronDown,
//   ChevronRight,
//   Code2,
//   Copy,
//   Database,
//   Download,
//   ExternalLink,
//   File,
//   FileText,
//   Folder,
//   Server,
//   Settings,
//   Shield,
//   Users,
// } from "lucide-solid";
const Braces = () => "✨";
const ChevronDown = () => "🔽";
const ChevronRight = () => "▶️";
const Code2 = () => "👨‍💻";
const Copy = () => "📄";
const Database = () => "🗄️";
const Download = () => "⬇️";
const ExternalLink = () => "➡️";
const File = () => "🗎";
const FileText = () => "🖹";
const Folder = () => "📁";
const Server = () => "🖥️";
const Settings = () => "⚙️";
const Shield = () => "🛡️";
const Users = () => "🧑‍🤝‍🧑";

// Mock file structure - in reality this would come from your pre-generated permutations
export default function Workspace() {
  const [config, setConfig] = createStore<{
    language: { value: string; label: string };
    database: { value: string; label: string };
    databaseClient: { value: string; label: string };
    serverFramework: { value: string; label: string };
    frontendFramework: { value: string; label: string };
    authStrategies: string[];
  }>({
    language: { value: "typescript", label: "TypeScript" },
    database: { value: "postgres", label: "PostgreSQL" },
    databaseClient: { value: "prisma", label: "Prisma" },
    serverFramework: { value: "next", label: "Next.js" },
    frontendFramework: { value: "react", label: "React" },
    authStrategies: ["email-password"],
  });

  const configMemo = () => ({
    language: config.language.value,
    database: config.database.value,
    databaseClient: config.databaseClient.value,
    serverFramework: config.serverFramework.value,
    frontendFramework: config.frontendFramework.value,
    authStrategies: config.authStrategies,
  });

  const [fileStructure, setFileStructure] = createSignal<FileNode | undefined>();
  const [selectedFile, setSelectedFile] = createSignal<FileNode | null>(null);
  const [expandedFolders, setExpandedFolders] = createSignal<Set<string>>(new Set(["/", "/src"]));

  createEffect(() => {
    // Simulate fetching pre-generated code structure
    const currentConfig = configMemo(); // Get current value of config signal
    const structure = generateFileStructure(currentConfig); // Pass value
    setFileStructure(structure);

    // Auto-select the main auth file
    const authFile = structure.children
      ?.find((c) => c.name === "src")
      ?.children?.find((c) => c.name === "lib")
      ?.children?.find((c) => c.name === "auth.ts");

    if (authFile) {
      setSelectedFile(authFile);
    }
  });

  const updateConfig = (key: keyof StackConfig, newValue: { value: string; label: string }) => {
    setConfig(key, newValue);
  };

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev: Set<string>) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const getFileIcon = (filename: string) => {
    if (filename.endsWith(".ts") || filename.endsWith(".tsx")) return "🔷";
    if (filename.endsWith(".json")) return "📋";
    if (filename.endsWith(".md")) return "📝";
    return "📄";
  };

  return (
    <div class="h-screen flex flex-col bg-background">
      {/* Header */}
      <header class="border-b px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Shield class="w-5 h-5" />
          <span class="font-semibold">Lucia Kit</span>
          <span class="text-muted-foreground">/ Workspace</span>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Copy class="w-4 h-4 mr-2" />
            Copy as LLMs.txt
          </Button>
          <Button variant="outline" size="sm">
            <Copy class="w-4 h-4 mr-2" />
            Create via CLI
          </Button>
          <Button variant="outline" size="sm">
            <Download class="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button size="sm">
            <ExternalLink class="w-4 h-4 mr-2" />
            Open with v0
          </Button>
        </div>
      </header>

      <div class="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div class="w-80 border-r flex flex-col">
          <div class="p-4">
            <label class="font-bold mb-2 block">
              <Shield class="w-3 h-3 inline mr-1" />
              Auth Strategies
            </label>
            <div class="space-y-2 text-sm text-foreground">
              {/* Email/Password */}
              <div class="space-y-1">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class="rounded"
                    checked={config.authStrategies.includes("email-password")}
                    onChange={() => {
                      setConfig("authStrategies", (prev) => {
                        const newSet = new Set(prev);
                        if (newSet.has("email-password")) {
                          newSet.delete("email-password");
                          newSet.delete("email-verification");
                          newSet.delete("password-reset");
                        } else {
                          newSet.add("email-password");
                        }
                        return Array.from(newSet);
                      });
                    }}
                  />
                  Email/Password
                </label>
                <div class="ml-6 space-y-1">
                  <label
                    class={`flex items-center gap-2 ${
                      config.authStrategies.includes("email-password")
                        ? "cursor-pointer"
                        : "cursor-not-allowed text-muted-foreground"
                    }`}
                  >
                    <input
                      type="checkbox"
                      class="rounded"
                      disabled={!config.authStrategies.includes("email-password")}
                      checked={config.authStrategies.includes("email-verification")}
                      onChange={() => {
                        setConfig("authStrategies", (prev) => {
                          const newSet = new Set(prev);
                          newSet.has("email-verification")
                            ? newSet.delete("email-verification")
                            : newSet.add("email-verification");
                          return Array.from(newSet);
                        });
                      }}
                    />
                    Email Verification
                  </label>
                  <label
                    class={`flex items-center gap-2 ${
                      config.authStrategies.includes("email-password")
                        ? "cursor-pointer"
                        : "cursor-not-allowed text-muted-foreground"
                    }`}
                  >
                    <input
                      type="checkbox"
                      class="rounded"
                      disabled={!config.authStrategies.includes("email-password")}
                      checked={config.authStrategies.includes("password-reset")}
                      onChange={() => {
                        setConfig("authStrategies", (prev) => {
                          const newSet = new Set(prev);
                          newSet.has("password-reset")
                            ? newSet.delete("password-reset")
                            : newSet.add("password-reset");
                          return Array.from(newSet);
                        });
                      }}
                    />
                    Password Reset
                  </label>
                </div>
              </div>

              {/* OAuth */}
              <div class="space-y-1">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class="rounded"
                    checked={config.authStrategies.includes("oauth")}
                    onChange={() => {
                      setConfig("authStrategies", (prev) => {
                        const newSet = new Set(prev);
                        if (newSet.has("oauth")) {
                          newSet.delete("oauth");
                          newSet.delete("oauth-cross-domain");
                          newSet.delete("oauth-github");
                          newSet.delete("oauth-google");
                        } else {
                          newSet.add("oauth");
                        }
                        return Array.from(newSet);
                      });
                    }}
                  />
                  OAuth
                </label>
                <div class="ml-6 space-y-1">
                  <label
                    class={`flex items-center gap-2 ${
                      config.authStrategies.includes("oauth")
                        ? "cursor-pointer"
                        : "cursor-not-allowed text-muted-foreground"
                    }`}
                  >
                    <input
                      type="checkbox"
                      class="rounded"
                      disabled={!config.authStrategies.includes("oauth")}
                      checked={config.authStrategies.includes("oauth-cross-domain")}
                      onChange={() => {
                        setConfig("authStrategies", (prev) => {
                          const newSet = new Set(prev);
                          newSet.has("oauth-cross-domain")
                            ? newSet.delete("oauth-cross-domain")
                            : newSet.add("oauth-cross-domain");
                          return Array.from(newSet);
                        });
                      }}
                    />
                    isCrossDomain{" "}
                    <span class="text-muted-foreground text-xs">(use one-time tokens)</span>
                  </label>
                  <label
                    class={`flex items-center gap-2 ${
                      config.authStrategies.includes("oauth")
                        ? "cursor-pointer"
                        : "cursor-not-allowed text-muted-foreground"
                    }`}
                  >
                    <input
                      type="checkbox"
                      class="rounded"
                      disabled={!config.authStrategies.includes("oauth")}
                      checked={config.authStrategies.includes("oauth-github")}
                      onChange={() => {
                        setConfig("authStrategies", (prev) => {
                          const newSet = new Set(prev);
                          newSet.has("oauth-github")
                            ? newSet.delete("oauth-github")
                            : newSet.add("oauth-github");
                          return Array.from(newSet);
                        });
                      }}
                    />
                    GitHub
                  </label>
                  <label
                    class={`flex items-center gap-2 ${
                      config.authStrategies.includes("oauth")
                        ? "cursor-pointer"
                        : "cursor-not-allowed text-muted-foreground"
                    }`}
                  >
                    <input
                      type="checkbox"
                      class="rounded"
                      disabled={!config.authStrategies.includes("oauth")}
                      checked={config.authStrategies.includes("oauth-google")}
                      onChange={() => {
                        setConfig("authStrategies", (prev) => {
                          const newSet = new Set(prev);
                          newSet.has("oauth-google")
                            ? newSet.delete("oauth-google")
                            : newSet.add("oauth-google");
                          return Array.from(newSet);
                        });
                      }}
                    />
                    Google
                  </label>
                </div>
              </div>

              {/* Other Strategies */}
              <For
                each={[
                  { id: "admin", label: "Admin" },
                  { id: "magic-link", label: "Magic Link" },
                  { id: "otp", label: "One Time Password (OTP)" },
                  { id: "one-time-token", label: "One-Time Token (cross-domain)" },
                  { id: "organization", label: "Organization (opinionated)" },
                  { id: "two-factor", label: "Two-Factor" },
                ]}
              >
                {(strategy) => (
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      class="rounded"
                      checked={config.authStrategies.includes(strategy.id)}
                      onChange={() => {
                        setConfig("authStrategies", (prev) => {
                          const newSet = new Set(prev);
                          newSet.has(strategy.id)
                            ? newSet.delete(strategy.id)
                            : newSet.add(strategy.id);
                          return Array.from(newSet);
                        });
                      }}
                    />
                    {strategy.label}
                  </label>
                )}
              </For>
            </div>
          </div>
          {/* Stack Configuration */}
          <div class="p-4 border-b">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <Settings class="w-4 h-4" />
              Stack Configuration
            </h3>
            <div class="space-y-3">
              <div>
                <label class="text-xs font-medium text-muted-foreground mb-1 block">
                  <Database class="w-3 h-3 inline mr-1" />
                  Database
                </label>
                <SelectComp
                  id="database"
                  options={[
                    { value: "postgres", label: "PostgreSQL" },
                    { value: "sqlite", label: "SQLite" },
                    { value: "libsql", label: "LibSQL" },
                    { value: "mongodb", label: "MongoDB" },
                  ]}
                  optionValue={(opt) => opt.value}
                  optionTextValue={(opt) => opt.label}
                  value={config.database}
                  onChange={(opt) => {
                    if (!opt?.value) return;
                    updateConfig("database", opt);
                  }}
                />
              </div>

              <div>
                <label class="text-xs font-medium text-muted-foreground mb-1 block">
                  <Code2 class="w-3 h-3 inline mr-1" />
                  Database Client
                </label>
                <SelectComp
                  id="databaseClient"
                  options={[
                    { value: "prisma", label: "Prisma" },
                    { value: "drizzle", label: "Drizzle" },
                    { value: "postgres-js", label: "Postgres.js" },
                  ]}
                  optionValue={(opt) => opt.value}
                  optionTextValue={(opt) => opt.label}
                  value={config.databaseClient}
                  onChange={(opt) => {
                    if (!opt?.value) return;
                    updateConfig("databaseClient", opt);
                  }}
                />
              </div>

              <div>
                <label class="text-xs font-medium text-muted-foreground mb-1 block">
                  <Server class="w-3 h-3 inline mr-1" />
                  Server Framework
                </label>
                <SelectComp
                  id="serverFramework"
                  options={[
                    { value: "next", label: "Next.js" },
                    { value: "hono", label: "Hono" },
                    { value: "elysia", label: "Elysia" },
                    { value: "sveltekit", label: "SvelteKit" },
                  ]}
                  optionValue={(opt) => opt.value}
                  optionTextValue={(opt) => opt.label}
                  value={config.serverFramework}
                  onChange={(opt) => {
                    if (!opt?.value) return;
                    updateConfig("serverFramework", opt);
                  }}
                />
              </div>

              <div>
                <label class="text-xs font-medium text-muted-foreground mb-1 block">
                  <Users class="w-3 h-3 inline mr-1" />
                  Frontend
                </label>
                <SelectComp
                  id="frontendFramework"
                  options={[
                    { value: "react", label: "React" },
                    { value: "svelte", label: "Svelte" },
                    { value: "vue", label: "Vue" },
                    { value: "none", label: "API Only" },
                  ]}
                  optionValue={(opt) => opt.value}
                  optionTextValue={(opt) => opt.label}
                  value={config.frontendFramework}
                  onChange={(opt) => {
                    if (!opt?.value) return;
                    updateConfig("frontendFramework", opt);
                  }}
                />
              </div>
            </div>
          </div>

          {/* File Explorer */}
          <div class="flex-1 overflow-hidden">
            <div class="p-3 border-b">
              <h3 class="font-semibold text-sm flex items-center gap-2">
                <Folder class="w-4 h-4" />
                File Explorer
              </h3>
            </div>
            <div class="flex-1 overflow-scroll">
              <div class="p-2">
                <Show when={fileStructure()}>
                  <FileTree
                    node={fileStructure()!}
                    expandedFolders={expandedFolders}
                    selectedFile={selectedFile}
                    toggleFolder={toggleFolder}
                    setSelectedFile={setSelectedFile}
                  />
                </Show>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div class="flex-1 flex flex-col">
          <Show
            when={selectedFile()}
            fallback={
              <div class="flex-1 flex items-center justify-center text-muted-foreground">
                <div class="text-center">
                  <File class="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a file to view its contents</p>
                </div>
              </div>
            }
          >
            {/* File Header */}
            <div class="border-b px-4 py-2 flex items-center gap-2">
              <span class="text-lg">{getFileIcon(selectedFile()!.name)}</span>
              <span class="font-medium">{selectedFile()!.name}</span>
              <Badge variant="outline" class="text-xs">
                {selectedFile()!.language || "text"}
              </Badge>
              <div class="ml-auto">
                <Button variant="ghost" size="sm">
                  <Copy class="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Code Content */}
            <div class="flex-1 overflow-auto">
              <pre class="p-4 text-sm font-mono bg-muted/30 h-full">
                <code>{selectedFile()!.content}</code>
              </pre>
            </div>
          </Show>
        </div>
      </div>
      <Button
        onClick={() => {
          alert("123");
        }}
      >
        Carlo
      </Button>
    </div>
  );
}

const FileTree = (props: {
  node: FileNode;
  depth?: number;
  expandedFolders: () => Set<string>;
  selectedFile: () => FileNode | null;
  toggleFolder: (path: string) => void;
  setSelectedFile: (node: FileNode) => void;
}) => {
  const depth = props.depth === undefined ? 0 : props.depth;
  const isExpanded = createMemo(() => props.expandedFolders().has(props.node.path));
  const isSelected = createMemo(() => props.selectedFile()?.path === props.node.path);

  return (
    <div>
      <div
        class={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer hover:bg-muted/50 ${
          isSelected() ? "bg-muted" : ""
        }`}
        style={{ "padding-left": `${depth * 12 + 8}px` }}
        onClick={() => {
          if (props.node.type === "folder") {
            props.toggleFolder(props.node.path);
          } else {
            props.setSelectedFile(props.node);
          }
        }}
      >
        <Show
          when={props.node.type === "folder"}
          fallback={
            <>
              <div class="w-4" />
              <Show
                when={props.node.name.endsWith(".ts") || props.node.name.endsWith(".tsx")}
                fallback={
                  <Show
                    when={props.node.name.endsWith(".json")}
                    fallback={<File class="w-4 h-4 text-muted-foreground" />}
                  >
                    <Braces class="w-4 h-4 text-yellow-500" />
                  </Show>
                }
              >
                <FileText class="w-4 h-4 text-blue-400" />
              </Show>
            </>
          }
        >
          <Show
            when={isExpanded()}
            fallback={<ChevronRight class="w-4 h-4 text-muted-foreground" />}
          >
            <ChevronDown class="w-4 h-4 text-muted-foreground" />
          </Show>
          <Folder class="w-4 h-4 text-blue-500" />
        </Show>
        <span class="text-sm">{props.node.name}</span>
      </div>
      <Show when={props.node.type === "folder" && isExpanded() && props.node.children}>
        <div>
          <For each={props.node.children!}>
            {(child) => (
              <FileTree
                node={child}
                depth={depth + 1}
                expandedFolders={props.expandedFolders}
                selectedFile={props.selectedFile}
                toggleFolder={props.toggleFolder}
                setSelectedFile={props.setSelectedFile}
              />
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};
