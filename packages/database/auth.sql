create table if not exists auth_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  scope varchar(20) not null check (scope in ('platform','tenant')),
  tenant_id uuid references tenants(id) on delete cascade,
  role varchar(80) not null,
  issued_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz
);

create index if not exists idx_auth_sessions_user on auth_sessions(user_id);
create index if not exists idx_auth_sessions_tenant on auth_sessions(tenant_id);
create index if not exists idx_auth_sessions_expires on auth_sessions(expires_at);

create table if not exists login_attempts (
  id uuid primary key default gen_random_uuid(),
  email varchar(320) not null,
  scope varchar(20) not null check (scope in ('platform','tenant')),
  success boolean not null,
  ip_hash varchar(128),
  created_at timestamptz not null default now()
);
