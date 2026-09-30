export type ProductDraft = {
  tenantId: string;
  spu: string;
  title: string;
  contents: Array<{ locale: string; title: string; description?: string; keywords: string[] }>;
  variants: Array<{ code: string; attributes: Record<string, string>; cost: number; currency: string }>;
  assets: Array<{ kind: "image" | "video"; url: string; sortOrder: number }>;
};

export type ProductValidationIssue = {
  field: string;
  code: "required" | "duplicate" | "invalid" | "missing_translation";
  message: string;
  severity: "error" | "warning";
};

export type ProductWorkflowState = "draft" | "review" | "approved" | "active" | "archived";

export function validateProductDraft(input: ProductDraft): ProductValidationIssue[] {
  const issues: ProductValidationIssue[] = [];
  if (!input.spu.trim()) issues.push({ field: "spu", code: "required", message: "SPU 不能为空", severity: "error" });
  if (!input.title.trim()) issues.push({ field: "title", code: "required", message: "商品名称不能为空", severity: "error" });
  if (!input.variants.length) issues.push({ field: "variants", code: "required", message: "至少需要一个 SKU", severity: "error" });
  if (!input.contents.length) issues.push({ field: "contents", code: "required", message: "至少需要一种语言的商品内容", severity: "error" });
  if (!input.assets.length) issues.push({ field: "assets", code: "required", message: "至少需要一份商品素材", severity: "warning" });
  const codes = new Set<string>();
  for (const variant of input.variants) {
    if (codes.has(variant.code)) issues.push({ field: `variants.${variant.code}`, code: "duplicate", message: "SKU 编码重复", severity: "error" });
    codes.add(variant.code);
  }
  return issues;
}
