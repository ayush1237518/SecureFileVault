-- Run this in Supabase Dashboard → SQL Editor

-- Files metadata table
create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  file_name text not null,
  file_size bigint not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create index if not exists files_user_id_idx on public.files (user_id);

alter table public.files enable row level security;

drop policy if exists "Users can view own files" on public.files;
create policy "Users can view own files"
  on public.files for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own files" on public.files;
create policy "Users can insert own files"
  on public.files for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own files" on public.files;
create policy "Users can delete own files"
  on public.files for delete
  using (auth.uid() = user_id);

-- Storage bucket (create in Dashboard → Storage if this fails)
insert into storage.buckets (id, name, public)
values ('vault-files', 'vault-files', false)
on conflict (id) do nothing;

drop policy if exists "Users can upload own files" on storage.objects;
create policy "Users can upload own files"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'vault-files'
    and (storage.foldername (name))[1] = auth.uid()::text
  );

drop policy if exists "Users can read own files" on storage.objects;
create policy "Users can read own files"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'vault-files'
    and (storage.foldername (name))[1] = auth.uid()::text
  );

drop policy if exists "Users can delete own files" on storage.objects;
create policy "Users can delete own files"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'vault-files'
    and (storage.foldername (name))[1] = auth.uid()::text
  );

-- Activity log (also in supabase/activity.sql)
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
