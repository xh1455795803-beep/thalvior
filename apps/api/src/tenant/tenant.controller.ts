import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller('tenant')
export class TenantController {
  @Get('context')
  getContext(@Req() request: Request) {
    const tenantId = request.header('x-tenant-id');
    return {
      tenantId: tenantId ?? null,
      authenticated: Boolean(tenantId),
      message: tenantId ? 'Tenant context resolved' : 'Tenant context is required',
    };
  }
}
