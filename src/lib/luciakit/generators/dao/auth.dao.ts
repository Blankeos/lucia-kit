//// filename:src/server/modules/auth/auth.dao.ts
import { generateId } from "@/server/modules/auth/auth.utils";

import { OAuthProviderId } from "@/server/lib/db/enums";
import { OAuthAccount, Session, User } from "@/server/lib/db/types";
import { db } from "@/server/lib/db/kysely";
import { Insertable, Selectable } from "kysely";

class Session {
  async create(params: { userId: string }) {
        {{#if databaseClientEnhancement.kysely}}
        const sessionId = generateId();

        const session = await db
          .insertInto("Session")
          .values({
            id: sessionId,
            userId: userId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days
          })
          .returning(["Session.expiresAt", "Session.id", "Session.userId"])
          .executeTakeFirst();

        return session;
      },
      findSessionAndUserBySessionId: async (
        sessionId: string
      ): Promise<{ session?: Selectable<Session>; user?: Selectable<User> }> => {
        const result = await db
          .selectFrom("Session")
          .where("Session.id", "=", sessionId)
          .leftJoin("User", "Session.userId", "User.id")
          .select([
            "Session.id as session_id",
            "Session.expiresAt as session_expiresAt",
            "Session.userId as session_userId",
          ])
          .selectAll("User")
          .executeTakeFirst();

        if (!result) return { session: undefined, user: undefined };

        const { session_id, session_expiresAt, session_userId, ...joinedUser } = result;

        const session: Selectable<Session> = {
          id: session_id,
          expiresAt: session_expiresAt,
          userId: session_userId,
        };

        if (!joinedUser.id) {
          return { session: session, user: undefined };
        }

        const _user: Selectable<User> = joinedUser as unknown as Selectable<User>;

        return { session: session, user: _user };
        {{/if}}
  }

  private async getWithUserBySessionId(params: { sessionId: string }) {}

  async validate(params: { sessionId: string | null }) {}
}

class OAuthAccount {
  async getByProviderIdAndProviderUserId(params: { providerId: string; providerUserId: string }) {}

  async create(params: {}) {}
}

class User {
  async getByEmail(params: { email: string }) {}

  async createFromOAuth(params: { newUser: {}; newOAuthAccount: {} }) {}
}

export class AuthDAO {
  session: Session;
  oauth: OAuthAccount;
  user: User;

  constructor() {
    this.session = new Session();
    this.oauth = new OAuthAccount();
    this.user = new User();
  }
}
