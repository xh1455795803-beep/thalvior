export type ListingField = { code: string; label: string; required: boolean; type: "text" | "number" | "select" | "boolean" | "asset" };
export type ListingTemplate = { channel: string; locale: string; fields: ListingField[] };
export type ListingDraft = { productId: string; channel: string; locale: string; values: Record<string, unknown> };

export function validateListing(template: ListingTemplate, draft: ListingDraft) {
  return template.fields.flatMap(field => {
    const value = draft.values[field.code];
    if (field.required && (value === undefined || value === null || value === "")) {
      return [{ field: field.code, message: `${field.label}不能为空`, severity: "error" as const }];
    }
    return [];
  });
}
