export type ProductAttribute = { code: string; name: string; values: string[] };
export type ProductVariant = { skuId: string; optionValues: Record<string, string>; price: number; compareAtPrice?: number; weight?: number; dimensions?: { length: number; width: number; height: number } };
export type ProductContent = { locale: string; title: string; shortDescription?: string; description?: string; bulletPoints: string[]; seoTitle?: string; seoDescription?: string; keywords: string[] };
export type ProductAsset = { id: string; kind: "image" | "video" | "document"; url: string; alt?: string; sortOrder: number; status: "ready" | "processing" | "failed" };
export type Listing = { id: string; tenantId: string; productId: string; channel: string; externalListingId?: string; locale: string; status: "draft" | "review" | "ready" | "published" | "error"; contentVersion: number };
export type AIJob = { id: string; tenantId: string; type: "translate" | "copy" | "seo" | "image" | "video"; provider: string; status: "queued" | "running" | "succeeded" | "failed"; input: Record<string, unknown>; output?: Record<string, unknown>; error?: string };
