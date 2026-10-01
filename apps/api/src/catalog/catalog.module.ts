import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogContentRepository } from './catalog-content.repository';
import { CatalogContentService } from './catalog-content.service';
import { CatalogRepository } from './catalog.repository';
import { CatalogService } from './catalog.service';

@Module({
  controllers: [CatalogController],
  providers: [CatalogRepository, CatalogService, CatalogContentRepository, CatalogContentService],
  exports: [CatalogRepository, CatalogService, CatalogContentRepository, CatalogContentService],
})
export class CatalogModule {}
