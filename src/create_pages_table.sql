-- Create the pages table for About Us content management
create table if not exists pages (
  slug text primary key,
  title text,
  content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table pages enable row level security;

-- Create policy to allow everyone to read pages
create policy "Public pages are viewable by everyone" 
on pages for select 
using (true);

-- Create policy to allow authenticated users to insert/update pages
-- (Assuming only admins are authenticated in this app context)
create policy "Authenticated users can insert pages" 
on pages for insert 
with check (auth.role() = 'authenticated');

create policy "Authenticated users can update pages" 
on pages for update 
using (auth.role() = 'authenticated');

-- Optional: content seeding (if you want to default them in DB, though the app handles fallback)
-- insert into pages (slug, title, content) values ('brief_history', 'Brief History', 'Default content...');
