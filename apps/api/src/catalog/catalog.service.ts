import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateProductInput } from './catalog.types';
import type { CreateProductDto, CreateSkuDto } from './catalog.dto';
import { CatalogRepository } from './catalog.repository';

@Injectable()
export class CatalogService {
  constructor(private readonly repository: CatalogRepository) {}

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

  createProduct(input: CreateProductDto) {
    return this.repository.create(this.validateCreateProduct(input));
  }

  getProduct(tenantId: string, id: string) {
    if (!tenantId) throw new BadRequestException('tenantId is required');
    return this.repository.getForTenant(tenantId, id);
  }

  createSku(input: CreateSkuDto) {
    if (!input.tenantId || !input.productId) throw new BadRequestException('tenantId and productId are required');
    if (!input.sku?.trim()) throw new BadRequestException('sku is required');
    if (!input.cost) throw new BadRequestException('cost is required');
    this.repository.getForTenant(input.tenantId, input.productId);
    return {
      tenantId: input.tenantId,
      productId: input.productId,
      sku: input.sku.trim(),
      barcode: input.barcode?.trim() || null,
      cost: input.cost,
      weightGram: input.weightGram ?? null,
      attributes: input.attributes ?? null,
    };
  }
}
