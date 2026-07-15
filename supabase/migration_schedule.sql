-- Run this in the Supabase SQL Editor after schema.sql.
-- Adds admin-editable Practice and Game schedule tables.

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
