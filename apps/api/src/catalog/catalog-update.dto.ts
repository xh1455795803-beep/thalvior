export class UpdateProductDto {
  name?: string;
  brand?: string | null;
  description?: string | null;
  status?: string;
  metadata?: Record<string, unknown> | null;
}

export class UpdateProductContentDto {
  locale?: string;
  channel?: string | null;
  title?: string | null;
  bullets?: string[] | null;
  description?: string | null;
  seo?: Record<string, unknown> | null;
  media?: Record<string, unknown> | null;
  status?: string;
}
