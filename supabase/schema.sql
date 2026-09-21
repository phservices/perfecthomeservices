-- Prefect Homes blog schema. Paste this whole file into
-- Supabase Dashboard > SQL Editor > New query > Run.

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  cover_image_url text,
  cover_image_alt text not null default '',
  category text not null default 'General',
  author text not null default 'Prefect Homes',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  seo_title text not null default '',
  seo_description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_status_published_at_idx
  on public.posts (status, published_at desc);

alter table public.posts enable row level security;

-- Visitors can only read published posts.
drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts for select
  to anon, authenticated
  using (status = 'published');

-- Logged-in admin can do everything (turn OFF public sign-ups in
-- Authentication > Sign In / Providers so only your admin user exists).
drop policy if exists "Admin can manage posts" on public.posts;
create policy "Admin can manage posts"
  on public.posts for all
  to authenticated
  using (true)
  with check (true);

-- Image storage (public bucket, only admin can upload).
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

drop policy if exists "Admin can upload blog images" on storage.objects;
create policy "Admin can upload blog images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images');

drop policy if exists "Admin can update blog images" on storage.objects;
create policy "Admin can update blog images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-images');

drop policy if exists "Admin can delete blog images" on storage.objects;
create policy "Admin can delete blog images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images');
