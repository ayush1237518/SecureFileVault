-- Run in Supabase Dashboard → SQL Editor (after schema.sql)

create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  action text not null check (action in ('login', 'upload', 'download', 'delete')),
  title text not null,
  detail text,
  created_at timestamptz not null default now()
);

create index if not exists activity_log_user_created_idx
  on public.activity_log (user_id, created_at desc);

alter table public.activity_log enable row level security;

drop policy if exists "Users view own activity" on public.activity_log;
create policy "Users view own activity"
  on public.activity_log for select
  using (auth.uid() = user_id);

drop policy if exists "Users insert own activity" on public.activity_log;
create policy "Users insert own activity"
  on public.activity_log for insert
  with check (auth.uid() = user_id);
