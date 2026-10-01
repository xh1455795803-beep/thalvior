import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TenantController } from './tenant/tenant.controller';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [CatalogModule],
  controllers: [HealthController, TenantController],
})
export class AppModule {}
