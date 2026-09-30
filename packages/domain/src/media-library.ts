export type MediaAsset = {
  id: string;
  tenantId: string;
  kind: "image" | "video" | "document";
  url: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  folderId?: string;
  tags: string[];
  status: "uploading" | "ready" | "processing" | "failed" | "archived";
};

export type MediaLink = {
  assetId: string;
  entityType: "product" | "sku" | "listing" | "ai_job";
  entityId: string;
  sortOrder: number;
  role: "main" | "gallery" | "video" | "document";
};

export function canUseAsset(asset: MediaAsset, tenantId: string) {
  return asset.tenantId === tenantId && asset.status === "ready";
}
