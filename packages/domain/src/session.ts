export type AuthSession = {
  id: string;
  userId: string;
  scope: "platform" | "tenant";
  tenantId?: string;
  role: string;
  issuedAt: string;
  expiresAt: string;
};

export type LoginRequest = {
  email: string;
  password: string;
  scope: "platform" | "tenant";
};

export type LoginResult = {
  session: AuthSession;
  requiresMfa: boolean;
};

export function assertSessionTenant(session: AuthSession, tenantId: string) {
  if (session.scope !== "tenant" || session.tenantId !== tenantId) {
    throw new Error("TENANT_SESSION_FORBIDDEN");
  }
}

export function assertSessionPlatform(session: AuthSession) {
  if (session.scope !== "platform") throw new Error("PLATFORM_SESSION_FORBIDDEN");
}
