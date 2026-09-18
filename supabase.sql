-- Cole tudo no Supabase > SQL Editor e clique em Run

create table if not exists public.votes (
  uid uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  c   text not null check (c in ('13','22','14','30','55','70','28','27','21','16','29','80','35')),
  t   timestamptz not null default now()
);

alter table public.votes enable row level security;

create policy "todos podem ver o placar" on public.votes
  for select to anon, authenticated using (true);

create policy "cada um registra o proprio voto" on public.votes
  for insert to authenticated with check (auth.uid() = uid);

create policy "cada um troca o proprio voto" on public.votes
  for update to authenticated using (auth.uid() = uid) with check (auth.uid() = uid);

create or replace function public.votes_set_time() returns trigger
language plpgsql as $$ begin new.t := now(); return new; end $$;

drop trigger if exists votes_set_time on public.votes;
create trigger votes_set_time before insert or update on public.votes
  for each row execute function public.votes_set_time();

alter publication supabase_realtime add table public.votes;
