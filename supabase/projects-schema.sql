-- Prefect Homes projects/portfolio schema. Paste this whole file into
-- Supabase Dashboard > SQL Editor > New query > Run.
-- (Run this in addition to supabase/schema.sql, which sets up the blog.)

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null default 'General',
  description text not null default '',
  cover_image_url text,
  cover_image_alt text not null default '',
  youtube_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_status_sort_idx
  on public.projects (status, sort_order, published_at desc);

-- Optional YouTube video shown on the project's page. (Adds the column to
-- databases created before it existed; safe to re-run.)
alter table public.projects add column if not exists youtube_url text;

-- Extra photos shown on a project's "full gallery" page.
create table if not exists public.project_gallery_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  image_url text not null,
  image_alt text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists project_gallery_images_project_idx
  on public.project_gallery_images (project_id, sort_order);

-- Optional before/after photo pairs shown on a project's "full gallery" page.
create table if not exists public.project_before_after (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  label text not null default '',
  before_image_url text not null,
  before_alt text not null default '',
  after_image_url text not null,
  after_alt text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists project_before_after_project_idx
  on public.project_before_after (project_id, sort_order);

alter table public.projects enable row level security;
alter table public.project_gallery_images enable row level security;
alter table public.project_before_after enable row level security;

-- Visitors can only read published projects.
drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
  on public.projects for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Public can read published project galleries" on public.project_gallery_images;
create policy "Public can read published project galleries"
  on public.project_gallery_images for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.status = 'published'
    )
  );

drop policy if exists "Public can read published project before/after" on public.project_before_after;
create policy "Public can read published project before/after"
  on public.project_before_after for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.status = 'published'
    )
  );

-- Logged-in admin can do everything (same admin user as the blog).
drop policy if exists "Admin can manage projects" on public.projects;
create policy "Admin can manage projects"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin can manage project galleries" on public.project_gallery_images;
create policy "Admin can manage project galleries"
  on public.project_gallery_images for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin can manage project before/after" on public.project_before_after;
create policy "Admin can manage project before/after"
  on public.project_before_after for all
  to authenticated
  using (true)
  with check (true);

-- Image storage (public bucket, only admin can upload).
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "Admin can upload project images" on storage.objects;
create policy "Admin can upload project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images');

drop policy if exists "Admin can update project images" on storage.objects;
create policy "Admin can update project images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-images');

drop policy if exists "Admin can delete project images" on storage.objects;
create policy "Admin can delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images');
