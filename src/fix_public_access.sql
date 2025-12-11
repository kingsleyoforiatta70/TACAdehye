-- Ensure tables have RLS enabled
alter table public.photos enable row level security;
alter table public.albums enable row level security;

-- Drop existing policies to avoid conflicts or confusion (optional but cleaner)
drop policy if exists "Photos are viewable by everyone." on public.photos;
drop policy if exists "Albums are viewable by everyone." on public.albums;

-- Re-create Public policies
create policy "Photos are viewable by everyone" 
on public.photos for select 
using ( true );

create policy "Albums are viewable by everyone" 
on public.albums for select 
using ( true );

-- Ensure storage public access
drop policy if exists "Public can view gallery images" on storage.objects;
create policy "Public can view gallery images"
on storage.objects for select
using ( bucket_id = 'gallery' );
