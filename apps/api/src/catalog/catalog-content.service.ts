import { Injectable } from '@nestjs/common';
import { CatalogContentRepository } from './catalog-content.repository';
import type { CreateProductContentDto } from './catalog-content.dto';

@Injectable()
export class CatalogContentService {
  constructor(private readonly repository: CatalogContentRepository) {}

  create(input: CreateProductContentDto) {
    return this.repository.create(input);
  }

  list(tenantId: string, productId: string) {
    return this.repository.list(tenantId, productId);
  }
}
