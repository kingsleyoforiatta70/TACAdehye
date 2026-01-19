-- Ensure leaders bucket is public
update storage.buckets
set public = true
where id = 'leaders';

-- If it doesn't exist, insert it
insert into storage.buckets (id, name, public)
values ('leaders', 'leaders', true)
on conflict (id) do update
set public = true;

-- Drop existing policies to avoid duplicates or conflicts if they were wrong
drop policy if exists "Public can view leader images" on storage.objects;
drop policy if exists "Admins can upload leader images" on storage.objects;
drop policy if exists "Admins can update leader images" on storage.objects;
drop policy if exists "Admins can delete leader images" on storage.objects;

-- Re-create policies for Storage
create policy "Public can view leader images"
  on storage.objects for select
  using ( bucket_id = 'leaders' );

create policy "Admins can upload leader images"
  on storage.objects for insert
  with check ( bucket_id = 'leaders' and auth.role() = 'authenticated' );

create policy "Admins can update leader images"
  on storage.objects for update
  with check ( bucket_id = 'leaders' and auth.role() = 'authenticated' );

create policy "Admins can delete leader images"
  on storage.objects for delete
  using ( bucket_id = 'leaders' and auth.role() = 'authenticated' );
