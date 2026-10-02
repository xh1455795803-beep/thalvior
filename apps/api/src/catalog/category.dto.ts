export class CreateCategoryDto {
  tenantId!: string;
  parentId?: string;
  name!: string;
  code!: string;
  status?: string;
}

export class UpdateCategoryDto {
  parentId?: string | null;
  name?: string;
  code?: string;
  status?: string;
}
