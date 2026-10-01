export interface CatalogScope {
  tenantId: string | null;
  status: string;
}

export interface CreateProductInput {
  tenantId: string;
  spu: string;
  name: string;
  brand?: string;
  description?: string;
  status?: string;
}
