-- Cole tudo no Supabase > SQL Editor e clique em Run
-- Esquema para o gerenciador de perfis multi-login

create table if not exists public.profile_groups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text not null default '#6366f1',
  created_at timestamptz not null default now()
);

create table if not exists public.browser_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  group_id uuid references public.profile_groups(id) on delete set null,
  status text not null default 'ready' check (status in ('ready','running','error','suspended')),
  notes text,
  tags text[] default '{}',

  -- fingerprint
  user_agent text,
  platform text default 'Windows',
  screen_w int default 1920,
  screen_h int default 1080,
  timezone text default 'America/Sao_Paulo',
  language text default 'pt-BR',
  webgl_vendor text,
  webgl_renderer text,
  canvas_noise numeric default 0,
  audio_noise numeric default 0,
  webrtc text default 'altered' check (webrtc in ('real','altered','disabled')),
  hardware_concurrency int default 8,
  device_memory int default 8,
  color_depth int default 24,
  do_not_track boolean default false,
  geolocation_mode text default 'prompt' check (geolocation_mode in ('prompt','allow','block')),
  geo_lat numeric,
  geo_lng numeric,

  -- proxy
  proxy_type text check (proxy_type in ('none','http','https','socks4','socks5')),
  proxy_host text,
  proxy_port int,
  proxy_user text,
  proxy_pass text,

  -- cookies
  cookies jsonb default '[]',

  last_opened timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profile_groups enable row level security;
alter table public.browser_profiles enable row level security;

create policy "users manage own groups" on public.profile_groups
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users manage own profiles" on public.browser_profiles
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.profiles_set_updated() returns trigger
language plpgsql as $$ begin new.updated_at := now(); return new; end $$;

drop trigger if exists profiles_set_updated on public.browser_profiles;
create trigger profiles_set_updated before update on public.browser_profiles
  for each row execute function public.profiles_set_updated();

alter publication supabase_realtime add table public.browser_profiles;
