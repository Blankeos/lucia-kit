import { PageRoutes } from "@/constants/page-routes"; // Keeping this as per original context for "Go to App"
import { useMetadata } from "vike-metadata-solid"; // Keeping this as per prompt

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getRoute } from "@/route-tree.gen";

const ArrowRight = () => <span>➡️</span>;
const BookOpen = () => <span>📚</span>;
const CheckCircle = () => <span>✅</span>;
const Code2 = () => <span>💻</span>;
const Copy = () => <span>📋</span>;
const Database = () => <span>🗄️</span>;
const Lock = () => <span>🔒</span>;
const Server = () => <span> 서버</span>; // Or 🖥️ or 🌐 depending on preference
const Shield = () => <span>🛡️</span>;
const Users = () => <span>👥</span>;
const Wrench = () => <span>🔧</span>;
const Zap = () => <span>⚡</span>;

export default function LandingPage() {
  // Changed component name as per prompt, but will add useMetadata
  useMetadata({}); // Retained as per prompt instruction

  return (
    <div class="min-h-screen bg-background">
      {/* Header */}
      <header class="border-b">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Shield class="w-6 h-6" />
            <span class="text-xl font-bold">Lucia Kit</span>
          </div>
          <nav class="hidden md:flex items-center gap-6">
            <a href="#what-is-auth" class="text-sm text-muted-foreground hover:text-foreground">
              {" "}
              {/* Changed Link to a */}
              Learn
            </a>
            <a href="#why" class="text-sm text-muted-foreground hover:text-foreground">
              {" "}
              {/* Changed Link to a */}
              Why
            </a>
            <Button
              variant="outline"
              size="sm"
              as="a"
              href="https://lucia-auth.com/book/get-started/solidstart"
            >
              {" "}
              {/* Added as="a" and href for Button, example link */}
              <BookOpen class="w-4 h-4 mr-2" />
              Lucia Book
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section class="py-20 px-4">
        <div class="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" class="mb-4">
            Framework Agnostic • No Dependencies • Own Your Auth
          </Badge>
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            The <span class="text-primary">shadcn/ui</span> for Authentication
          </h1>
          <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A semi-opinionated, but framework-agnostic implementation of auth based on the Lucia
            book. Not a library, not a framework, just a tool.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" class="text-lg px-8" as="a" href={getRoute("/builder")}>
              {" "}
              {/* Added as="a" and href */}
              Go to App
              <ArrowRight class="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              class="text-lg px-8 bg-transparent"
              as="a"
              href="https://lucia-auth.com/book/get-started/solidstart"
            >
              {" "}
              {/* Added as="a" and href */}
              <BookOpen class="w-5 h-5 mr-2" />
              Read the Lucia Book
            </Button>
          </div>
          <p class="text-sm text-muted-foreground">
            Set up your auth in literally <strong>5 minutes</strong> with this interactive tool
          </p>
        </div>
      </section>

      {/* What is Lucia Kit */}
      <section class="py-16 px-4 bg-muted/30">
        <div class="container mx-auto max-w-4xl">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">What is Lucia Kit?</h2>
            <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
              Using the Lucia book, we've created a very agnostic tool/learning resource that'll
              help you mix and match TypeScript technologies to build auth that fits your stack.
            </p>
          </div>

          <div class="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Copy class="w-8 h-8 mb-2 text-primary" />
                <CardTitle>Copy & Paste</CardTitle>
                <CardDescription>
                  Just like shadcn/ui, copy the components you need into your project
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Wrench class="w-8 h-8 mb-2 text-primary" />
                <CardTitle>Customizable</CardTitle>
                <CardDescription>
                  Own your auth code completely. Edit and extend without limitations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap class="w-8 h-8 mb-2 text-primary" />
                <CardTitle>Zero Dependencies</CardTitle>
                <CardDescription>
                  No extra packages. Pure TypeScript that works with your existing stack
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap class="w-8 h-8 mb-2 text-primary" />
                <CardTitle>Tested</CardTitle>
                <CardDescription>
                  Each permutation of your choice was tested so the template you get will always
                  work!
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* What is Auth */}
      <section id="what-is-auth" class="py-16 px-4">
        <div class="container mx-auto max-w-4xl">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">What is Auth?</h2>
            <p class="text-lg text-muted-foreground">
              To achieve framework agnosticism, we had to be a bit opinionated, we slice our backend
              into these 6 essential parts:
            </p>
          </div>

          {/*
            Missed details:
            1. DB Tech
              - Database
              - DB Client
            2. Auth Strategies
            3. Auth Schemas (GEN)
            4. DAOs (GEN)
            5. Services (GEN)
            5. Server Tech
              - NextJS
              - Hono
            6. Controllers and Middlewares
            7. Frontend Tech
              - React
              - Svelte
            8. Auth Client (GEN)
          */}
          <div class="grid gap-6">
            <Card>
              <CardHeader>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span class="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <CardTitle class="text-lg">Data Access Objects (DAO)</CardTitle>
                    <CardDescription>Helpers that query and mutate the database</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span class="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <CardTitle class="text-lg">Session Management API</CardTitle>
                    <CardDescription>
                      The core session logic (what used to be the Lucia library) that you'll build
                      from scratch
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span class="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <CardTitle class="text-lg">API Controllers (Endpoints)</CardTitle>
                    <CardDescription>All your auth routes and strategies</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 class="font-medium mb-2">Core Endpoints:</h4>
                    <ul class="space-y-1 text-muted-foreground">
                      <li>• List all users</li>
                      <li>• Current user /auth</li>
                      <li>• Logout /auth/logout</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-medium mb-2">Auth Strategies:</h4>
                    <ul class="space-y-1 text-muted-foreground">
                      <li>• OAuth providers</li>
                      <li>• Email & Password</li>
                      <li>• Magic Link</li>
                      <li>• Sign up & Sign in</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span class="text-sm font-bold text-primary">4</span>
                  </div>
                  <div>
                    <CardTitle class="text-lg">API Services</CardTitle>
                    <CardDescription>
                      Plain agnostic functions that abstract the logic of each endpoint
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div class="mt-8 p-6 bg-muted rounded-lg text-center">
            <p class="text-lg">
              Believe it or not, this is <strong>auth</strong>. Plain and simple.
            </p>
            <p class="text-muted-foreground mt-2">
              That's what third-party auth providers are abstracting away from you.
            </p>
            <p class="font-medium mt-4">Stop being a baby and roll your own. 💪</p>
          </div>
        </div>
      </section>

      {/* Fit Your Stack */}
      <section class="py-16 px-4 bg-muted/30">
        <div class="container mx-auto max-w-6xl">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Fit it to your stack!</h2>
            <p class="text-lg text-muted-foreground">
              Choose your preferred technologies and get perfectly tailored auth code
            </p>
          </div>

          <div class="grid lg:grid-cols-2 gap-12 items-center">
            {/* Technology Options */}
            <div class="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader class="text-center">
                  <Database class="w-8 h-8 mx-auto mb-2 text-primary" />
                  <CardTitle class="text-lg">Database</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul class="space-y-2 text-sm">
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      PostgreSQL
                    </li>
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      SQLite
                    </li>
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      LibSQL
                    </li>
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      MongoDB
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader class="text-center">
                  <Code2 class="w-8 h-8 mx-auto mb-2 text-primary" />
                  <CardTitle class="text-lg">ORM/Client</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul class="space-y-2 text-sm">
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      Prisma
                    </li>
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      Drizzle
                    </li>
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      Raw SQL
                    </li>
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />+ Kysely
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader class="text-center">
                  <Server class="w-8 h-8 mx-auto mb-2 text-primary" />
                  <CardTitle class="text-lg">Server</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul class="space-y-2 text-sm">
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      Next.js
                    </li>
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      Hono
                    </li>
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      SvelteKit
                    </li>
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />+ tRPC
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader class="text-center">
                  <Users class="w-8 h-8 mx-auto mb-2 text-primary" />
                  <CardTitle class="text-lg">Frontend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul class="space-y-2 text-sm">
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      React
                    </li>
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      Svelte
                    </li>
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      Vue
                    </li>
                    <li class="flex items-center gap-2">
                      <CheckCircle class="w-4 h-4 text-green-500" />
                      SolidJS
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sandwich Illustration */}
            <div class="flex flex-col items-center">
              <h3 class="text-2xl font-bold mb-6 text-center">
                Auth is the <span class="text-primary">perfect filling</span> for your stack
                sandwich
              </h3>

              <div class="relative">
                {/* Sandwich Container */}
                <div class="bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-full w-80 h-12 flex items-center justify-center border-2 border-amber-300 shadow-lg">
                  <span class="text-sm font-medium text-amber-800">
                    🍞 Frontend (React, Vue, Svelte)
                  </span>
                </div>

                {/* Auth Layer - The Special Sauce */}
                <div class="bg-gradient-to-r from-green-400 to-green-500 w-80 h-8 flex items-center justify-center border-x-2 border-green-600 shadow-md relative">
                  <span class="text-sm font-bold text-white">
                    🔐 AUTH LAYER (Session Management)
                  </span>
                  <div class="absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <div class="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full whitespace-nowrap">
                      The Magic! ✨
                    </div>
                  </div>
                </div>

                {/* Server Layer */}
                <div class="bg-gradient-to-b from-blue-400 to-blue-500 w-80 h-10 flex items-center justify-center border-x-2 border-blue-600 shadow-md">
                  <span class="text-sm font-medium text-white">
                    🚀 Server (Next.js, Hono, SvelteKit)
                  </span>
                </div>

                {/* ORM Layer */}
                <div class="bg-gradient-to-b from-purple-400 to-purple-500 w-80 h-8 flex items-center justify-center border-x-2 border-purple-600 shadow-md">
                  <span class="text-sm font-medium text-white">⚡ ORM (Prisma, Drizzle)</span>
                </div>

                {/* Database Layer - The Foundation */}
                <div class="bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-full w-80 h-12 flex items-center justify-center border-2 border-gray-800 shadow-lg">
                  <span class="text-sm font-medium text-white">
                    🗄️ Database (PostgreSQL, SQLite)
                  </span>
                </div>

                {/* Decorative elements */}
                <div class="absolute -left-8 top-1/2 transform -translate-y-1/2 text-4xl animate-bounce">
                  🥪
                </div>
                <div class="absolute -right-8 top-1/2 transform -translate-y-1/2 text-4xl animate-bounce delay-500">
                  😋
                </div>
              </div>

              <div class="mt-8 text-center max-w-md">
                <p class="text-muted-foreground mb-4">
                  Just like a perfect sandwich, auth needs to complement every layer of your stack.
                </p>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div class="bg-muted/50 p-3 rounded-lg">
                    <div class="font-medium mb-1">🔄 Adapts to your stack</div>
                    <div class="text-muted-foreground">
                      Changes based on your database, ORM, and server choices
                    </div>
                  </div>
                  <div class="bg-muted/50 p-3 rounded-lg">
                    <div class="font-medium mb-1">🎯 Perfect integration</div>
                    <div class="text-muted-foreground">
                      No awkward adapters or forced abstractions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="why" class="py-16 px-4">
        <div class="container mx-auto max-w-4xl">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Why did we make this?</h2>
            <p class="text-lg text-muted-foreground">
              We wanted a headless solution for Session Auth, like how shadcn/ui is for accessible
              UI components.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Users class="w-8 h-8 mb-2 text-primary" />
                <CardTitle>For Library Users</CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <p class="text-sm text-muted-foreground">
                  Having a ready-made library is convenient, but once you want something custom, it
                  becomes a limitation.
                </p>
                <p class="text-sm">
                  <strong>When you own your code</strong>, you can edit it without waiting for a
                  maintainer to support your use case.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Code2 class="w-8 h-8 mb-2 text-primary" />
                <CardTitle>For Library Authors</CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <p class="text-sm text-muted-foreground">
                  Maintaining library code, adapters, and abstractions to fit everyone's use case is
                  a hassle and can get outdated quickly.
                </p>
                <p class="text-sm">
                  <strong>It's why Lucia stopped being a library.</strong>
                </p>
              </CardContent>
            </Card>
          </div>

          <div class="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <Lock class="w-5 h-5" />
              The Beauty of Ownership
            </h3>
            <p class="text-sm text-muted-foreground mb-3">
              Not making auth a library means we don't need to create adapters and install adapter
              dependencies.
            </p>
            <p class="text-sm">
              The implementations are <strong>straight to the point</strong> and{" "}
              <strong>easy to edit</strong>.
            </p>
          </div>

          <div class="mt-8 text-center">
            <p class="text-lg mb-2">
              Session Auth is the <strong>simplest type of auth</strong> that fits 90% of app use
              cases.
            </p>
            <p class="text-muted-foreground">
              Forget JWTs and Refresh Tokens for now. Keep it simple.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-20 px-4 bg-primary text-primary-foreground">
        <div class="container mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold mb-4">Ready to own your auth?</h2>
          <p class="text-lg opacity-90 mb-8">
            Stop depending on third-party services. Build session auth that perfectly fits your
            stack.
          </p>
          <Button size="lg" variant="secondary" class="text-lg px-8" as="a" href={PageRoutes.App}>
            {" "}
            {/* Added as="a" and href */}
            Go to App
            <ArrowRight class="w-5 h-5 ml-2" />
          </Button>
          <p class="text-sm opacity-75 mt-4">
            Set up in 5 minutes • No sign-up required • Completely free
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer class="border-t py-8 px-4">
        <div class="container mx-auto max-w-4xl">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="flex items-center gap-2">
              <Shield class="w-5 h-5" />
              <span class="font-semibold">Lucia Kit</span>
            </div>
            <div class="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" class="hover:text-foreground">
                {" "}
                {/* Changed Link to a */}
                Documentation
              </a>
              <a href="https://github.com/your-repo/lucia-kit" class="hover:text-foreground">
                {" "}
                {/* Changed Link to a, added example link */}
                GitHub
              </a>
              <a
                href="https://lucia-auth.com/book/get-started/solidstart"
                class="hover:text-foreground"
              >
                {" "}
                {/* Changed Link to a, added example link */}
                Lucia Book
              </a>
            </div>
          </div>
          <Separator class="my-4" />
          <p class="text-center text-sm text-muted-foreground">
            Built with inspiration from the Lucia book by Pilcrowonpaper
          </p>
        </div>
      </footer>
    </div>
  );
}
