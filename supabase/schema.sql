-- Expat507 - Supabase Schema
-- Run this in the Supabase SQL Editor to initialize all tables

-- Leads (Consulta Gratuita form)
create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text not null,
  country     text not null,
  objective   text not null,
  budget      text not null,
  urgency     text not null,
  message     text,
  created_at  timestamptz not null default now()
);

-- Run this once if the "leads" table already exists from a previous deploy:
-- alter table leads add column if not exists phone text not null default '';

-- Index for operator lookups by date and email
create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_email_idx on leads (email);

-- Subscribers (Newsletter form)
create table if not exists subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  name        text,
  created_at  timestamptz not null default now(),
  active      boolean not null default true
);

create index if not exists subscribers_email_idx on subscribers (email);
create index if not exists subscribers_created_at_idx on subscribers (created_at desc);

-- Articles (CMS for Guides)
create table if not exists articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  excerpt      text,
  content      text,
  category     text not null,
  author       text not null default 'Equipo Expat507',
  cover_image  text,
  published    boolean not null default false,
  featured     boolean not null default false,
  read_time    integer,  -- minutes
  tags         text[],
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists articles_slug_idx on articles (slug);
create index if not exists articles_category_idx on articles (category);
create index if not exists articles_published_idx on articles (published, published_at desc);
create index if not exists articles_featured_idx on articles (featured) where featured = true;

-- Automatically update updated_at on row modification
create or replace function update_updated_at_column()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger articles_updated_at
  before update on articles
  for each row execute procedure update_updated_at_column();

-- Contacts (Contacto form)
create table if not exists contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

create index if not exists contacts_created_at_idx on contacts (created_at desc);

-- Row Level Security
-- All tables are write-only from the public (anon) client.
-- Read access requires the service role key (server-side only).

alter table leads enable row level security;
alter table subscribers enable row level security;
alter table articles enable row level security;
alter table contacts enable row level security;

-- Public can insert leads
create policy "Public can insert leads"
  on leads for insert to anon with check (true);

-- Public can insert subscribers
create policy "Public can insert subscribers"
  on subscribers for insert to anon with check (true);

-- Public can read published articles
create policy "Public can read published articles"
  on articles for select to anon using (published = true);

-- Public can insert contacts
create policy "Public can insert contacts"
  on contacts for insert to anon with check (true);

-- Service role has full access (implicit - service role bypasses RLS)
