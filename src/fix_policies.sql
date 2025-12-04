-- Fix RLS Policies

-- 1. SLIDES TABLE
alter table public.slides enable row level security;

-- Drop existing policies to avoid conflicts
drop policy if exists "Slides are viewable by everyone." on slides;
drop policy if exists "Admins can insert slides." on slides;
drop policy if exists "Admins can delete slides." on slides;

-- Re-create policies
create policy "Slides are viewable by everyone."
  on slides for select
  using ( true );

create policy "Admins can insert slides."
  on slides for insert
  with check ( auth.role() = 'authenticated' );

create policy "Admins can delete slides."
  on slides for delete
  using ( auth.role() = 'authenticated' );

-- 2. MESSAGES TABLE
alter table public.messages enable row level security;

-- Drop existing policies
drop policy if exists "Admins can view all messages." on messages;
drop policy if exists "Anyone can insert messages." on messages;
drop policy if exists "Admins can update messages (mark as read)." on messages;
drop policy if exists "Admins can delete messages." on messages;

-- Re-create policies
create policy "Admins can view all messages."
  on messages for select
  using ( auth.role() = 'authenticated' );

create policy "Anyone can insert messages."
  on messages for insert
  with check ( true );

create policy "Admins can update messages (mark as read)."
  on messages for update
  using ( auth.role() = 'authenticated' );

create policy "Admins can delete messages."
  on messages for delete
  using ( auth.role() = 'authenticated' );

-- 3. STORAGE POLICIES (Just in case)
-- Note: Storage policies are on storage.objects
drop policy if exists "Slides images are publicly accessible." on storage.objects;
drop policy if exists "Admins can upload slides images." on storage.objects;
drop policy if exists "Admins can delete slides images." on storage.objects;

create policy "Slides images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'slides' );

create policy "Admins can upload slides images."
  on storage.objects for insert
  with check ( bucket_id = 'slides' and auth.role() = 'authenticated' );

create policy "Admins can delete slides images."
  on storage.objects for delete
  using ( bucket_id = 'slides' and auth.role() = 'authenticated' );
