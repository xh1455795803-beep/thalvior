import { Injectable } from '@nestjs/common';
import { CatalogContentRepository } from './catalog-content.repository';
import type { CreateProductContentDto } from './catalog-content.dto';

@Injectable()
export class CatalogContentService {
  constructor(private readonly repository: CatalogContentRepository) {}

  create(input: CreateProductContentDto) { return this.repository.create(input); }
  list(tenantId: string, productId: string) { return this.repository.list(tenantId, productId); }
  update(tenantId: string, id: string, input: Partial<Omit<CreateProductContentDto, 'tenantId' | 'productId'>>) { return this.repository.update(tenantId, id, input); }
  remove(tenantId: string, id: string) { return this.repository.remove(tenantId, id); }
}
