import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { CatalogService } from './catalog.service';
import { CatalogContentService } from './catalog-content.service';
import type { CreateProductDto, CreateSkuDto } from './catalog.dto';
import type { CreateProductContentDto } from './catalog-content.dto';

@Controller('catalog')
export class CatalogController {
  constructor(
    private readonly service: CatalogService,
    private readonly contentService: CatalogContentService,
  ) {}

  @Get('scope')
  getScope(@Req() request: Request, @Query('status') status?: string) {
    return { tenantId: request.header('x-tenant-id') ?? null, status: status ?? 'active', resource: 'catalog', message: 'Catalog API scope initialized' };
  }

  @Get('products')
  listProducts(@Req() request: Request, @Query('status') status?: string) {
    return this.service.listProducts(request.header('x-tenant-id') ?? '', status);
  }

  @Post('products')
  createProduct(@Body() body: CreateProductDto) { return this.service.createProduct(body); }

  @Get('products/:id')
  getProduct(@Req() request: Request, @Param('id') id: string) { return this.service.getProduct(request.header('x-tenant-id') ?? '', id); }

  @Get('products/:productId/skus')
  listSkus(@Req() request: Request, @Param('productId') productId: string) { return this.service.listSkus(request.header('x-tenant-id') ?? '', productId); }

  @Post('skus')
  createSku(@Body() body: CreateSkuDto) { return this.service.createSku(body); }

  @Post('products/:productId/content')
  createProductContent(@Req() request: Request, @Param('productId') productId: string, @Body() body: Omit<CreateProductContentDto, 'tenantId' | 'productId'>) {
    return this.contentService.create({ ...body, tenantId: request.header('x-tenant-id') ?? '', productId });
  }

  @Get('products/:productId/content')
  listProductContent(@Req() request: Request, @Param('productId') productId: string) {
    return this.contentService.list(request.header('x-tenant-id') ?? '', productId);
  }
}
