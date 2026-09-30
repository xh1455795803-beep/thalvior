create extension if not exists pgcrypto;

create table if not exists tenants (
  id uuid primary key default gen_random_uuid(), name varchar(120) not null,
  slug varchar(80) not null unique, status varchar(20) not null default 'active',
  default_currency char(3) not null default 'USD', default_locale varchar(12) not null default 'zh-CN',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references tenants(id),
  email varchar(320) not null, name varchar(120) not null, status varchar(20) not null default 'active',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (tenant_id, email)
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references tenants(id),
  spu varchar(80) not null, title varchar(500) not null, status varchar(20) not null default 'draft',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (tenant_id, spu)
);

create table if not exists skus (
  id uuid primary key default gen_random_uuid(), product_id uuid not null references products(id) on delete cascade,
  code varchar(120) not null, barcode varchar(120), cost numeric(18,4) not null default 0,
  currency char(3) not null default 'USD', status varchar(20) not null default 'draft',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (product_id, code)
);

create table if not exists warehouses (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references tenants(id),
  code varchar(60) not null, name varchar(160) not null, status varchar(20) not null default 'active',
  created_at timestamptz not null default now(), unique (tenant_id, code)
);

create table if not exists inventory_balances (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references tenants(id),
  sku_id uuid not null references skus(id), warehouse_id uuid not null references warehouses(id),
  available integer not null default 0, reserved integer not null default 0, incoming integer not null default 0,
  updated_at timestamptz not null default now(), unique (sku_id, warehouse_id)
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references tenants(id),
  order_no varchar(100) not null, status varchar(30) not null default 'pending',
  currency char(3) not null default 'USD', total numeric(18,4) not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (tenant_id, order_no)
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(), tenant_id uuid references tenants(id),
  actor_user_id uuid references users(id), action varchar(100) not null, resource_type varchar(80) not null,
  resource_id uuid, metadata jsonb not null default '{}', created_at timestamptz not null default now()
);
