export type ID = string;
export type CurrencyCode = string;
export type LocaleCode = string;

export type Tenant = { id: ID; name: string; slug: string; status: "active" | "suspended"; defaultCurrency: CurrencyCode; defaultLocale: LocaleCode };
export type User = { id: ID; tenantId: ID; email: string; name: string; status: "active" | "invited" | "disabled" };
export type ProductStatus = "draft" | "active" | "archived";
export type Product = { id: ID; tenantId: ID; spu: string; title: string; status: ProductStatus };
export type SKU = { id: ID; productId: ID; code: string; barcode?: string; cost: number; currency: CurrencyCode; status: ProductStatus };
export type OrderStatus = "pending" | "paid" | "processing" | "shipped" | "completed" | "cancelled" | "refunded";
export type Order = { id: ID; tenantId: ID; orderNo: string; status: OrderStatus; currency: CurrencyCode; total: number };
export type Inventory = { id: ID; tenantId: ID; skuId: ID; warehouseId: ID; available: number; reserved: number; incoming: number };
