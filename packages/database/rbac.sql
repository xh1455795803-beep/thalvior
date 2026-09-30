create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name varchar(80) not null,
  description varchar(300),
  system boolean not null default false,
  created_at timestamptz not null default now(),
  unique (tenant_id, name)
);

create table if not exists role_permissions (
  role_id uuid not null references roles(id) on delete cascade,
  permission varchar(160) not null,
  primary key (role_id, permission)
);

create table if not exists user_role_bindings (
  user_id uuid not null references users(id) on delete cascade,
  role_id uuid not null references roles(id) on delete cascade,
  tenant_id uuid not null references tenants(id) on delete cascade,
  primary key (user_id, role_id)
);

create index if not exists idx_user_role_bindings_tenant on user_role_bindings(tenant_id);
create index if not exists idx_roles_tenant on roles(tenant_id);
