export interface StackConfig {
  language: string;
  database: string;
  databaseClient: string;
  serverFramework: string;
  frontendFramework: string;
  authStrategies: string[];
}

export interface FileNode {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: FileNode[];
  content?: string;
  language?: string;
}

export const generateFileStructure = (config: StackConfig): FileNode => {
  return {
    name: "lucia-auth",
    type: "folder",
    path: "/",
    children: [
      {
        name: "src",
        type: "folder",
        path: "/src",
        children: [
          {
            name: "lib",
            type: "folder",
            path: "/src/lib",
            children: [
              {
                name: "auth.ts",
                type: "file",
                path: "/src/lib/auth.ts",
                content: `// Session management for ${config.serverFramework}
import { cookies } from 'next/headers'
import { generateId } from './utils'

export interface Session {
  id: string
  userId: string
  expiresAt: Date
}

export class SessionManager {
  async createSession(userId: string): Promise<Session> {
    const sessionId = generateId()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days

    // Store in ${config.database}
    const session = {
      id: sessionId,
      userId,
      expiresAt
    }

    return session
  }

  async validateSession(sessionId: string): Promise<Session | null> {
    // Validate against ${config.database}
    return null
  }
}`,
                language: "typescript",
              },
              {
                name: "db.ts",
                type: "file",
                path: "/src/lib/db.ts",
                content: `// Database client using ${config.databaseClient}
${
  config.databaseClient === "prisma"
    ? `import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient()`
    : `import { drizzle } from 'drizzle-orm/${config.database}'

export const db = drizzle(process.env.DATABASE_URL)`
}`,
                language: "typescript",
              },
            ],
          },
          {
            name: "dao",
            type: "folder",
            path: "/src/dao",
            children: [
              {
                name: "user.dao.ts",
                type: "file",
                path: "/src/dao/user.dao.ts",
                content: `// User Data Access Object
import { db } from '../lib/db'

export interface User {
  id: string
  email: string
  passwordHash?: string
  createdAt: Date
}

export class UserDAO {
  async findByEmail(email: string): Promise<User | null> {
    // Implementation for ${config.databaseClient}
    return null
  }

  async create(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    // Implementation for ${config.databaseClient}
    throw new Error('Not implemented')
  }
}`,
                language: "typescript",
              },
              {
                name: "session.dao.ts",
                type: "file",
                path: "/src/dao/session.dao.ts",
                content: `// Session Data Access Object
import { db } from '../lib/db'
import type { Session } from '../lib/auth'

export class SessionDAO {
  async create(session: Session): Promise<void> {
    // Store session in ${config.database}
  }

  async findById(id: string): Promise<Session | null> {
    // Find session in ${config.database}
    return null
  }

  async delete(id: string): Promise<void> {
    // Delete session from ${config.database}
  }
}`,
                language: "typescript",
              },
            ],
          },
          {
            name: "api",
            type: "folder",
            path: "/src/api",
            children: [
              {
                name: "auth",
                type: "folder",
                path: "/src/api/auth",
                children: config.authStrategies.includes("email-password")
                  ? [
                      {
                        name: "signin.ts",
                        type: "file",
                        path: "/src/api/auth/signin.ts",
                        content: `// Sign in endpoint for ${config.serverFramework}
import { AuthService } from '../../services/auth.service'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const result = await AuthService.signIn(email, password)
    return Response.json(result)
  } catch (error) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}`,
                        language: "typescript",
                      },
                      {
                        name: "signup.ts",
                        type: "file",
                        path: "/src/api/auth/signup.ts",
                        content: `// Sign up endpoint for ${config.serverFramework}
import { AuthService } from '../../services/auth.service'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const result = await AuthService.signUp(email, password)
    return Response.json(result)
  } catch (error) {
    return Response.json({ error: 'Registration failed' }, { status: 400 })
  }
}`,
                        language: "typescript",
                      },
                    ]
                  : [],
              },
            ],
          },
          {
            name: "services",
            type: "folder",
            path: "/src/services",
            children: [
              {
                name: "auth.service.ts",
                type: "file",
                path: "/src/services/auth.service.ts",
                content: `// Authentication service layer
import { UserDAO } from '../dao/user.dao'
import { SessionDAO } from '../dao/session.dao'
import { SessionManager } from '../lib/auth'
import { hashPassword, verifyPassword } from '../lib/crypto'

export class AuthService {
  private static userDAO = new UserDAO()
  private static sessionDAO = new SessionDAO()
  private static sessionManager = new SessionManager()

  static async signIn(email: string, password: string) {
    const user = await this.userDAO.findByEmail(email)
    if (!user || !user.passwordHash) {
      throw new Error('Invalid credentials')
    }

    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
      throw new Error('Invalid credentials')
    }

    const session = await this.sessionManager.createSession(user.id)
    await this.sessionDAO.create(session)

    return { user, sessionId: session.id }
  }

  static async signUp(email: string, password: string) {
    const existingUser = await this.userDAO.findByEmail(email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    const passwordHash = await hashPassword(password)
    const user = await this.userDAO.create({ email, passwordHash })

    const session = await this.sessionManager.createSession(user.id)
    await this.sessionDAO.create(session)

    return { user, sessionId: session.id }
  }
}`,
                language: "typescript",
              },
            ],
          },
        ],
      },
      {
        name: "package.json",
        type: "file",
        path: "/package.json",
        content: `{
  "name": "lucia-auth-${config.serverFramework}",
  "version": "1.0.0",
  "dependencies": {
    ${config.databaseClient === "prisma" ? '"@prisma/client": "^5.0.0",' : ""}
    ${config.databaseClient === "drizzle" ? '"drizzle-orm": "^0.29.0",' : ""}
    ${config.serverFramework === "next" ? '"next": "^14.0.0",' : ""}
    ${config.serverFramework === "hono" ? '"hono": "^3.0.0",' : ""}
    "bcryptjs": "^2.4.3",
    "nanoid": "^5.0.0"
  }
}`,
        language: "json",
      },
      {
        name: "README.md",
        type: "file",
        path: "/README.md",
        content: `# Lucia Auth - ${config.serverFramework} + ${config.database}

Your custom authentication system generated by Lucia Kit.

## Stack
- **Language**: ${config.language}
- **Database**: ${config.database}
- **Client**: ${config.databaseClient}
- **Server**: ${config.serverFramework}
- **Frontend**: ${config.frontendFramework || "None"}
- **Auth Methods**: ${config.authStrategies.join(", ")}

## Quick Start

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up your database:
\`\`\`bash
# Add your DATABASE_URL to .env
echo "DATABASE_URL=your_connection_string" > .env
\`\`\`

3. Run migrations (if using Prisma/Drizzle):
\`\`\`bash
npm run db:migrate
\`\`\`

4. Start your server:
\`\`\`bash
npm run dev
\`\`\`

## Architecture

This auth system follows the 4-layer architecture from the Lucia book:

1. **DAOs** (\`/src/dao\`) - Database access objects
2. **Session Management** (\`/src/lib/auth.ts\`) - Core session logic
3. **API Controllers** (\`/src/api\`) - HTTP endpoints
4. **Services** (\`/src/services\`) - Business logic

## Customization

Since you own this code, feel free to modify it to fit your needs:
- Add new auth strategies
- Customize session duration
- Add role-based permissions
- Integrate with your existing user model

Need help? Check out the [Lucia book](https://lucia-auth.com) for detailed explanations.
`,
        language: "markdown",
      },
    ],
  };
};
