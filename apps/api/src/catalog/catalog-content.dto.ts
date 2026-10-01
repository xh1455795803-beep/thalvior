export class CreateProductContentDto {
  tenantId!: string;
  productId!: string;
  locale!: string;
  channel?: string;
  title?: string;
  bullets?: string[];
  description?: string;
  seo?: Record<string, unknown>;
  media?: Record<string, unknown>;
  status?: string;
}
