export type VariantOption = { code: string; name: string; values: string[] };
export type GeneratedSKU = { code: string; attributes: Record<string,string> };

export function generateSKUs(spu: string, options: VariantOption[]): GeneratedSKU[] {
  if (!options.length) return [{ code: `${spu}-001`, attributes: {} }];
  return options.reduce<GeneratedSKU[]>((rows, option) => {
    if (!rows.length) return option.values.map((value, i) => ({ code: `${spu}-${String(i + 1).padStart(3, "0")}`, attributes: { [option.code]: value } }));
    return rows.flatMap(row => option.values.map(value => ({
      code: `${row.code}-${String(value).replace(/[^a-zA-Z0-9]+/g, "-").toUpperCase()}`,
      attributes: { ...row.attributes, [option.code]: value }
    })));
  }, []);
}
