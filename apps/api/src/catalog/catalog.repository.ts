import { Injectable, NotFoundException } from '@nestjs/common';

export interface CatalogProductRecord {
  id: string;
  tenantId: string;
  spu: string;
  name: string;
  brand: string | null;
  description: string | null;
  status: string;
}

/**
 * Persistence boundary for the catalog domain.
 * The API layer deliberately depends on this contract rather than leaking
 * Prisma types into controllers. Database wiring can be supplied here when
 * the shared DB package exposes its generated client.
 */
@Injectable()
export class CatalogRepository {
  private readonly products = new Map<string, CatalogProductRecord>();

  findByTenantAndSpu(tenantId: string, spu: string) {
    for (const product of this.products.values()) {
      if (product.tenantId === tenantId && product.spu === spu) return product;
    }
    return null;
  }

  create(product: Omit<CatalogProductRecord, 'id'>) {
    const existing = this.findByTenantAndSpu(product.tenantId, product.spu);
    if (existing) throw new Error('Product SPU already exists for this tenant');
    const record = { ...product, id: `product_${Date.now()}_${Math.random().toString(36).slice(2, 8)}` };
    this.products.set(record.id, record);
    return record;
  }

  getForTenant(tenantId: string, id: string) {
    const product = this.products.get(id);
    if (!product || product.tenantId !== tenantId) throw new NotFoundException('Product not found');
    return product;
  }
}
