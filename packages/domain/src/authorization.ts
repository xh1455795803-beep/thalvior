export type Scope = "platform" | "tenant";
export type PlatformRole = "platform_owner" | "platform_admin" | "platform_operations" | "platform_finance" | "platform_support";
export type TenantRole = "tenant_owner" | "tenant_admin" | "tenant_operator" | "tenant_finance" | "tenant_warehouse";

export type Principal = {
  userId: string;
  scope: Scope;
  tenantId?: string;
  role: PlatformRole | TenantRole;
};

export function assertTenantScope(principal: Principal, tenantId: string) {
  if (principal.scope !== "tenant" || principal.tenantId !== tenantId) throw new Error("TENANT_SCOPE_FORBIDDEN");
}

export function assertPlatformScope(principal: Principal) {
  if (principal.scope !== "platform") throw new Error("PLATFORM_SCOPE_FORBIDDEN");
}
