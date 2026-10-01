import { Controller, Get, Query, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller('catalog')
export class CatalogController {
  @Get('scope')
  getScope(@Req() request: Request, @Query('status') status?: string) {
    return {
      tenantId: request.header('x-tenant-id') ?? null,
      status: status ?? 'active',
      resource: 'catalog',
      message: 'Catalog API scope initialized',
    };
  }
}
