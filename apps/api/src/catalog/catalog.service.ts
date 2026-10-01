import { Injectable, BadRequestException } from '@nestjs/common';
import type { CreateProductInput } from './catalog.types';

@Injectable()
export class CatalogService {
  validateCreateProduct(input: CreateProductInput) {
    if (!input.tenantId) throw new BadRequestException('tenantId is required');
    if (!input.spu?.trim()) throw new BadRequestException('spu is required');
    if (!input.name?.trim()) throw new BadRequestException('name is required');

    return {
      tenantId: input.tenantId,
      spu: input.spu.trim(),
      name: input.name.trim(),
      brand: input.brand?.trim() || null,
      description: input.description?.trim() || null,
      status: input.status ?? 'draft',
    };
  }
}
