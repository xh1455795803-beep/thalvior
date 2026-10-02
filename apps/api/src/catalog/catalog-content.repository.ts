import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@thalvior/db';
import type { CreateProductContentDto } from './catalog-content.dto';

@Injectable()
export class CatalogContentRepository {
  async create(input: CreateProductContentDto) {
    if (!input.tenantId || !input.productId || !input.locale) throw new BadRequestException('tenantId, productId and locale are required');
    const product = await db.product.findFirst({ where: { id: input.productId, tenantId: input.tenantId } });
    if (!product) throw new NotFoundException('Product not found');
    return db.productContent.create({ data: { productId: input.productId, locale: input.locale, channel: input.channel ?? null, title: input.title ?? null, bullets: input.bullets ?? null, description: input.description ?? null, seo: input.seo ?? null, media: input.media ?? null, status: input.status ?? 'draft' } });
  }

  async list(tenantId: string, productId: string) {
    const product = await db.product.findFirst({ where: { id: productId, tenantId } });
    if (!product) throw new NotFoundException('Product not found');
    return db.productContent.findMany({ where: { productId }, orderBy: { updatedAt: 'desc' } });
  }

  async update(tenantId: string, id: string, input: Partial<Omit<CreateProductContentDto, 'tenantId' | 'productId'>>) {
    const content = await db.productContent.findFirst({ where: { id }, include: { product: true } });
    if (!content || content.product.tenantId !== tenantId) throw new NotFoundException('Product content not found');
    return db.productContent.update({ where: { id }, data: input });
  }

  async remove(tenantId: string, id: string) {
    const content = await db.productContent.findFirst({ where: { id }, include: { product: true } });
    if (!content || content.product.tenantId !== tenantId) throw new NotFoundException('Product content not found');
    await db.productContent.delete({ where: { id } });
    return { id, deleted: true };
  }
}
