export type ProductEditorDraft = {
  tenantId: string;
  spu: string;
  title: string;
  brand?: string;
  categoryId?: string;
  contents: Array<{ locale: string; title: string; description?: string; bulletPoints: string[]; keywords: string[] }>;
  options: Array<{ code: string; name: string; values: string[] }>;
  skus: Array<{ code: string; attributes: Record<string,string>; price: number; cost: number; currency: string; weight?: number }>;
  assets: Array<{ id: string; kind: "image" | "video"; url: string; sortOrder: number }>;
};

export type ProductSaveResult = { valid: boolean; errors: Array<{ field: string; message: string }>; warnings: Array<{ field: string; message: string }> };

export function validateProductEditor(draft: ProductEditorDraft): ProductSaveResult {
  const errors: ProductSaveResult["errors"] = [];
  const warnings: ProductSaveResult["warnings"] = [];
  if (!draft.spu.trim()) errors.push({ field: "spu", message: "SPU 不能为空" });
  if (!draft.title.trim()) errors.push({ field: "title", message: "商品名称不能为空" });
  if (!draft.contents.some(x => x.locale === "zh-CN")) warnings.push({ field: "contents", message: "建议补充中文商品内容" });
  if (!draft.contents.some(x => x.locale === "en-US")) warnings.push({ field: "contents", message: "建议补充英文商品内容" });
  if (!draft.skus.length) errors.push({ field: "skus", message: "至少需要一个 SKU" });
  const codes = new Set<string>();
  for (const sku of draft.skus) {
    if (codes.has(sku.code)) errors.push({ field: `skus.${sku.code}`, message: "SKU 编码重复" });
    codes.add(sku.code);
    if (sku.cost < 0) errors.push({ field: `skus.${sku.code}.cost`, message: "成本不能小于 0" });
    if (sku.price < 0) errors.push({ field: `skus.${sku.code}.price`, message: "售价不能小于 0" });
  }
  if (!draft.assets.length) warnings.push({ field: "assets", message: "尚未添加商品素材" });
  return { valid: errors.length === 0, errors, warnings };
}
