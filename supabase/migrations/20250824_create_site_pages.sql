-- Create site_pages table to control page visibility
create table if not exists public.site_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  visible boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Seed known pages (home and contact are always visible via app logic; not included here)
insert into public.site_pages (slug, title, visible) values
  ('about', 'About', true),
  ('team', 'Team', true),
  ('programs', 'Programs', true),
  ('events', 'Events', true),
  ('projects', 'Projects', true),
  ('resources', 'Resources', true),
  ('join', 'Join', true),
  ('dashboard', 'Dashboard', true),
  ('dashboard-landing', 'Dashboard Landing', true),
  ('spiral', 'Spiral', true),
  ('wavy', 'Wavy', true)
  on conflict (slug) do update set title = excluded.title;
