-- Run this once in the Supabase SQL Editor for this project.
-- Sets up tables for admin-editable site content, plus RLS policies:
-- public read access, writes restricted to authenticated users (admins).

-- ---------- Coaches & Executive Board ----------
create table if not exists people (
  id uuid primary key default gen_random_uuid(),
  section text not null check (section in ('coach', 'exec_board')),
  name text not null,
  role text not null,
  photo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table people enable row level security;

create policy "Public read access" on people
  for select using (true);

create policy "Admins can manage people" on people
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------- Alumni ----------
create table if not exists alumni (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  years_played text not null,
  class_year text not null,
  position text not null,
  bio text not null,
  favorite_color text not null default '#B39051',
  photo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table alumni enable row level security;

create policy "Public read access" on alumni
  for select using (true);

create policy "Admins can manage alumni" on alumni
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------- Site text content (editable copy blocks per page) ----------
create table if not exists site_content (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table site_content enable row level security;

create policy "Public read access" on site_content
  for select using (true);

create policy "Admins can manage site content" on site_content
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------- Carousel photo storage ----------
insert into storage.buckets (id, name, public)
values ('carousel-photos', 'carousel-photos', true)
on conflict (id) do nothing;

create policy "Public read carousel photos" on storage.objects
  for select using (bucket_id = 'carousel-photos');

create policy "Admins can upload carousel photos" on storage.objects
  for insert with check (bucket_id = 'carousel-photos' and auth.role() = 'authenticated');

create policy "Admins can delete carousel photos" on storage.objects
  for delete using (bucket_id = 'carousel-photos' and auth.role() = 'authenticated');

-- ---------- People & alumni photo storage ----------
insert into storage.buckets (id, name, public)
values ('site-photos', 'site-photos', true)
on conflict (id) do nothing;

create policy "Public read site photos" on storage.objects
  for select using (bucket_id = 'site-photos');

create policy "Admins can upload site photos" on storage.objects
  for insert with check (bucket_id = 'site-photos' and auth.role() = 'authenticated');

create policy "Admins can delete site photos" on storage.objects
  for delete using (bucket_id = 'site-photos' and auth.role() = 'authenticated');

-- ---------- Practice Schedule ----------
create table if not exists practices (
  id uuid primary key default gen_random_uuid(),
  day text not null,
  time text not null,
  location text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table practices enable row level security;

create policy "Public read access" on practices
  for select using (true);

create policy "Admins can manage practices" on practices
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------- Game Schedule ----------
create table if not exists games (
  id uuid primary key default gen_random_uuid(),
  date text not null,
  opponent text not null,
  is_home boolean not null default true,
  time text not null,
  location text not null,
  status text not null check (status in ('Win', 'Loss', 'Upcoming')),
  score text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table games enable row level security;

create policy "Public read access" on games
  for select using (true);

create policy "Admins can manage games" on games
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
