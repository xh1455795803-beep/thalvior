export type PermissionAction = "view" | "create" | "edit" | "delete" | "export" | "approve" | "publish";
export type PermissionResource = "products" | "listings" | "orders" | "inventory" | "procurement" | "logistics" | "finance" | "customers" | "analytics" | "automation" | "settings";

export type Permission = `${PermissionResource}:${PermissionAction}`;

export type Role = {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  permissions: Permission[];
  system: boolean;
};

export type UserRoleBinding = {
  userId: string;
  roleId: string;
  tenantId: string;
};

export const defaultTenantPermissions: Record<string, Permission[]> = {
  tenant_owner: ["products:view","products:create","products:edit","products:delete","products:export","listings:view","listings:create","listings:edit","listings:publish","orders:view","orders:edit","inventory:view","inventory:edit","procurement:view","procurement:create","logistics:view","finance:view","customers:view","analytics:view","automation:view","settings:view","settings:edit"],
  tenant_operator: ["products:view","products:create","products:edit","products:export","listings:view","listings:create","listings:edit","orders:view","orders:edit","inventory:view","procurement:view","logistics:view","customers:view","analytics:view","automation:view"],
  tenant_finance: ["orders:view","finance:view","finance:export","analytics:view"],
  tenant_warehouse: ["orders:view","inventory:view","inventory:edit","procurement:view","logistics:view"]
};
