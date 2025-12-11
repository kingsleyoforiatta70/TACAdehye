-- Add date column to albums if it doesn't exist
-- You can run this in Supabase SQL Editor
alter table public.albums 
add column if not exists album_date date default CURRENT_DATE;

-- Update existing albums to have a date (optional)
update public.albums set album_date = created_at::date where album_date is null;
