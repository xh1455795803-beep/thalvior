export class CreateProductDto {
  tenantId!: string;
  spu!: string;
  name!: string;
  brand?: string;
  description?: string;
  status?: string;
}

export class CreateSkuDto {
  tenantId!: string;
  productId!: string;
  sku!: string;
  barcode?: string;
  cost!: string;
  weightGram?: string;
  attributes?: Record<string, unknown>;
}
