-- Prefect Homes: credentials (About page), Academy details, and quote requests.
-- Paste this whole file into Supabase Dashboard > SQL Editor > New query > Run.
-- (Run this in addition to schema.sql and projects-schema.sql. Safe to re-run.)

-- ─── Credentials: certifications, memberships, awards, qualifications ───────

create table if not exists public.credentials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null default '',
  year text not null default '',
  kind text not null default 'Certification'
    check (kind in ('Certification', 'Membership', 'Award', 'Qualification')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.credentials enable row level security;

drop policy if exists "Public can read credentials" on public.credentials;
create policy "Public can read credentials"
  on public.credentials for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin can manage credentials" on public.credentials;
create policy "Admin can manage credentials"
  on public.credentials for all
  to authenticated
  using (true)
  with check (true);

-- ─── Academy details (a single row, id = 1) ─────────────────────────────────

create table if not exists public.academy_settings (
  id integer primary key default 1 check (id = 1),
  course_fee text not null default '',
  fee_note text not null default '',
  duration text not null default '',
  next_batch_date date,
  next_batch_note text not null default '',
  who_can_apply text[] not null default '{}',
  curriculum text[] not null default '{}',
  what_you_receive text[] not null default '{}',
  bank_name text not null default '',
  account_name text not null default '',
  account_number text not null default '',
  payment_note text not null default '',
  faqs jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.academy_settings enable row level security;

drop policy if exists "Public can read academy settings" on public.academy_settings;
create policy "Public can read academy settings"
  on public.academy_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin can manage academy settings" on public.academy_settings;
create policy "Admin can manage academy settings"
  on public.academy_settings for all
  to authenticated
  using (true)
  with check (true);

-- ─── Quote requests (from the public "Request a Quote" form) ────────────────

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null default '',
  location text not null,
  service text not null,
  property_type text not null,
  budget text not null default '',
  description text not null,
  preferred_start_date date,
  photo_paths text[] not null default '{}',
  status text not null default 'new' check (status in ('new', 'handled')),
  created_at timestamptz not null default now()
);

create index if not exists quote_requests_created_idx
  on public.quote_requests (created_at desc);

alter table public.quote_requests enable row level security;

-- Visitors can submit a request but never read anyone's requests.
drop policy if exists "Public can submit quote requests" on public.quote_requests;
create policy "Public can submit quote requests"
  on public.quote_requests for insert
  to anon, authenticated
  with check (status = 'new');

drop policy if exists "Admin can manage quote requests" on public.quote_requests;
create policy "Admin can manage quote requests"
  on public.quote_requests for all
  to authenticated
  using (true)
  with check (true);

-- Photo storage for quote requests: PRIVATE bucket (clients' home photos).
-- Visitors can upload images up to 10 MB; only the admin can view them.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('quote-photos', 'quote-photos', false, 10485760, array['image/*'])
on conflict (id) do nothing;

drop policy if exists "Public can upload quote photos" on storage.objects;
create policy "Public can upload quote photos"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'quote-photos');

drop policy if exists "Admin can read quote photos" on storage.objects;
create policy "Admin can read quote photos"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'quote-photos');

drop policy if exists "Admin can delete quote photos" on storage.objects;
create policy "Admin can delete quote photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'quote-photos');
