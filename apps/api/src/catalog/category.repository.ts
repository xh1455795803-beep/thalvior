import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@thalvior/db';
import type { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryRepository {
  async list(tenantId: string) {
    if (!tenantId) throw new BadRequestException('tenantId is required');
    return db.category.findMany({ where: { tenantId }, orderBy: [{ parentId: 'asc' }, { name: 'asc' }] });
  }

  async create(input: CreateCategoryDto) {
    if (!input.tenantId || !input.name?.trim() || !input.code?.trim()) throw new BadRequestException('tenantId, name and code are required');
    if (input.parentId) await this.assertTenantCategory(input.tenantId, input.parentId);
    return db.category.create({ data: { tenantId: input.tenantId, parentId: input.parentId ?? null, name: input.name.trim(), code: input.code.trim(), status: input.status ?? 'active' } });
  }

  async update(tenantId: string, id: string, input: UpdateCategoryDto) {
    await this.assertTenantCategory(tenantId, id);
    if (input.parentId) await this.assertTenantCategory(tenantId, input.parentId);
    if (input.parentId === id) throw new BadRequestException('Category cannot be its own parent');
    return db.category.update({ where: { id }, data: { ...input, name: input.name?.trim(), code: input.code?.trim() } });
  }

  async remove(tenantId: string, id: string) {
    await this.assertTenantCategory(tenantId, id);
    const child = await db.category.findFirst({ where: { tenantId, parentId: id } });
    if (child) throw new BadRequestException('Category has child categories');
    await db.category.delete({ where: { id } });
    return { id, deleted: true };
  }

  private async assertTenantCategory(tenantId: string, id: string) {
    const category = await db.category.findFirst({ where: { id, tenantId } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
}
