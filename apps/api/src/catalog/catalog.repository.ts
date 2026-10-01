import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@thalvior/db';

export interface CatalogProductRecord {
  id: string;
  tenantId: string;
  spu: string;
  name: string;
  brand: string | null;
  description: string | null;
  status: string;
}

@Injectable()
export class CatalogRepository {
  async findByTenantAndSpu(tenantId: string, spu: string): Promise<CatalogProductRecord | null> {
    const product = await db.product.findFirst({ where: { tenantId, spu } });
    return product ? this.toRecord(product) : null;
  }

  async create(product: Omit<CatalogProductRecord, 'id'>): Promise<CatalogProductRecord> {
    const existing = await this.findByTenantAndSpu(product.tenantId, product.spu);
    if (existing) throw new Error('Product SPU already exists for this tenant');
    const created = await db.product.create({
      data: {
        tenantId: product.tenantId,
        spu: product.spu,
        name: product.name,
        brand: product.brand,
        description: product.description,
        status: product.status,
      },
    });
    return this.toRecord(created);
  }

  async getForTenant(tenantId: string, id: string): Promise<CatalogProductRecord> {
    const product = await db.product.findFirst({ where: { id, tenantId } });
    if (!product) throw new NotFoundException('Product not found');
    return this.toRecord(product);
  }

  private toRecord(product: {
    id: string;
    tenantId: string;
    spu: string;
    name: string;
    brand: string | null;
    description: string | null;
    status: string;
  }): CatalogProductRecord {
    return {
      id: product.id,
      tenantId: product.tenantId,
      spu: product.spu,
      name: product.name,
      brand: product.brand,
      description: product.description,
      status: product.status,
    };
  }
}
