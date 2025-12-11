-- IMPORTANT: RUN THIS IN SUPABASE SQL EDITOR

-- 1. Enable RLS on storage.objects (It is usually enabled by default, but good to be sure)
-- alter table storage.objects enable row level security;

-- 2. Allow Authenticated Users (Admins) to UPLOAD files to 'gallery' bucket
create policy "Admins can upload gallery images"
on storage.objects for insert
with check ( bucket_id = 'gallery' and auth.role() = 'authenticated' );

-- 3. Allow Authenticated Users (Admins) to DELETE files from 'gallery' bucket
create policy "Admins can delete gallery images"
on storage.objects for delete
using ( bucket_id = 'gallery' and auth.role() = 'authenticated' );

-- 4. Allow Everyone (Public) to VIEW files in 'gallery' bucket
create policy "Public can view gallery images"
on storage.objects for select
using ( bucket_id = 'gallery' );
