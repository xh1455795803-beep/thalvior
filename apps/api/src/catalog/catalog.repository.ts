import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@thalvior/db';

export interface CatalogProductRecord { id: string; tenantId: string; spu: string; name: string; brand: string | null; description: string | null; status: string; }
export interface CatalogSkuRecord { id: string; tenantId: string; productId: string; sku: string; barcode: string | null; cost: string; weightGram: string | null; attributes: unknown; }

@Injectable()
export class CatalogRepository {
  async findByTenantAndSpu(tenantId: string, spu: string): Promise<CatalogProductRecord | null> { const product = await db.product.findFirst({ where: { tenantId, spu } }); return product ? this.toProductRecord(product) : null; }
  async listProducts(tenantId: string, status?: string): Promise<CatalogProductRecord[]> { const products = await db.product.findMany({ where: { tenantId, ...(status ? { status } : {}) }, orderBy: { createdAt: 'desc' } }); return products.map((product) => this.toProductRecord(product)); }
  async create(product: Omit<CatalogProductRecord, 'id'>): Promise<CatalogProductRecord> { if (await this.findByTenantAndSpu(product.tenantId, product.spu)) throw new Error('Product SPU already exists for this tenant'); return this.toProductRecord(await db.product.create({ data: product })); }
  async getForTenant(tenantId: string, id: string): Promise<CatalogProductRecord> { const product = await db.product.findFirst({ where: { id, tenantId } }); if (!product) throw new NotFoundException('Product not found'); return this.toProductRecord(product); }
  async updateForTenant(tenantId: string, id: string, data: { name?: string; brand?: string | null; description?: string | null; status?: string; metadata?: Record<string, unknown> | null }) { await this.getForTenant(tenantId, id); return this.toProductRecord(await db.product.update({ where: { id }, data })); }
  async deleteForTenant(tenantId: string, id: string) { await this.getForTenant(tenantId, id); await db.product.delete({ where: { id } }); return { id, deleted: true }; }
  async listSkus(tenantId: string, productId: string): Promise<CatalogSkuRecord[]> { await this.getForTenant(tenantId, productId); const skus = await db.sku.findMany({ where: { productId }, orderBy: { createdAt: 'desc' } }); return skus.map((sku) => this.toSkuRecord(sku, tenantId)); }
  async createSku(input: { tenantId: string; productId: string; sku: string; barcode?: string | null; cost: string; weightGram?: string | null; attributes?: Record<string, unknown> | null }): Promise<CatalogSkuRecord> { await this.getForTenant(input.tenantId, input.productId); if (await db.sku.findFirst({ where: { productId: input.productId, sku: input.sku } })) throw new Error('SKU already exists for this product'); const created = await db.sku.create({ data: { productId: input.productId, sku: input.sku, barcode: input.barcode ?? null, cost: input.cost, weightGram: input.weightGram ?? null, attributes: input.attributes ?? null } }); return this.toSkuRecord(created, input.tenantId); }
  private toProductRecord(product: { id: string; tenantId: string; spu: string; name: string; brand: string | null; description: string | null; status: string }) { return { id: product.id, tenantId: product.tenantId, spu: product.spu, name: product.name, brand: product.brand, description: product.description, status: product.status }; }
  private toSkuRecord(sku: { id: string; productId: string; sku: string; barcode: string | null; cost: { toString(): string }; weightGram: { toString(): string } | null; attributes: unknown }, tenantId: string) { return { id: sku.id, tenantId, productId: sku.productId, sku: sku.sku, barcode: sku.barcode, cost: sku.cost.toString(), weightGram: sku.weightGram?.toString() ?? null, attributes: sku.attributes }; }
}
