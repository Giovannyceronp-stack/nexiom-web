-- Nexiom Intelligence Group
-- Production Supabase schema for Web, Academia, CRM and Certificates
-- Run this file in Supabase SQL Editor before enabling production use.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'participant' check (role in ('admin', 'instructor', 'participant', 'client')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  sector text,
  status text not null default 'prospect' check (status in ('prospect', 'active', 'inactive', 'closed')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  folio text not null unique,
  nombre text not null,
  email text not null,
  telefono text,
  empresa text,
  servicio text,
  mensaje text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  duration_hours integer not null default 0,
  category text not null,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  progress_percent integer not null default 0 check (progress_percent >= 0 and progress_percent <= 100),
  status text not null default 'in_progress' check (status in ('in_progress', 'completed', 'cancelled')),
  final_score numeric(5,2),
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  unique(user_id, course_id)
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  folio text not null unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  enrollment_id uuid references public.enrollments(id) on delete set null,
  issued_at timestamptz not null default now(),
  pdf_url text,
  status text not null default 'issued' check (status in ('issued', 'revoked'))
);

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.contact_requests enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.certificates enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

create policy "courses_public_select" on public.courses for select using (published = true);

create policy "enrollments_select_own" on public.enrollments for select using (auth.uid() = user_id);
create policy "enrollments_insert_own" on public.enrollments for insert with check (auth.uid() = user_id);
create policy "enrollments_update_own" on public.enrollments for update using (auth.uid() = user_id);

create policy "certificates_select_own" on public.certificates for select using (auth.uid() = user_id);

-- Public contact form can insert requests without exposing existing records.
create policy "contact_requests_public_insert" on public.contact_requests for insert with check (true);

-- Admin-only operational tables can be accessed with Supabase service role from server-side code.
-- Never expose SUPABASE_SERVICE_ROLE_KEY in the browser.

insert into public.courses (slug, title, description, duration_hours, category)
values
  ('capital-humano-estrategico', 'Capital Humano Estratégico', 'Gestión estratégica de talento, estructura organizacional, indicadores y desarrollo humano aplicado.', 40, 'Capital Humano'),
  ('automatizacion-procesos-rh', 'Automatización de Procesos RH', 'Automatización práctica de flujos administrativos, reportes, seguimiento y mejora continua.', 30, 'IA y Automatización'),
  ('nom-035-stps-2018', 'Cumplimiento Normativo NOM-035-STPS-2018', 'Implementación documentada, evidencias, riesgos psicosociales, reportes y seguimiento.', 20, 'Cumplimiento Normativo')
on conflict (slug) do nothing;
