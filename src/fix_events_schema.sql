-- 1. Fix the table structure by adding missing columns
alter table public.events add column if not exists day text;
alter table public.events add column if not exists time text;
alter table public.events add column if not exists description text;
alter table public.events add column if not exists image_url text;
alter table public.events add column if not exists leader_name text;
alter table public.events add column if not exists leader_role text;
alter table public.events add column if not exists detailed_description text;

-- 2. Enable Security (idempotent)
alter table public.events enable row level security;

-- 3. Update Policies (Drop and Recreate to be safe)
drop policy if exists "Public can view events" on public.events;
drop policy if exists "Admins can insert events" on public.events;
drop policy if exists "Admins can update events" on public.events;
drop policy if exists "Admins can delete events" on public.events;

create policy "Public can view events" on public.events for select using ( true );
create policy "Admins can insert events" on public.events for insert with check ( auth.role() = 'authenticated' );
create policy "Admins can update events" on public.events for update using ( auth.role() = 'authenticated' );
create policy "Admins can delete events" on public.events for delete using ( auth.role() = 'authenticated' );

-- 4. Seed Data
-- We verify if the specific event exists by title. If it does not, we insert it.
-- If it DOES exist (but might be missing fields), you might want to manually update it or delete it first.
-- For now, this ensures the data is there if the table was empty.

insert into public.events (title, day, time, description, detailed_description, leader_name, leader_role)
select 'English Service', 'Sunday', '6:30 AM - 9:00 AM', 'Start your week with our English worship service.', 'Join us for a spirit-filled English service where we worship, praise, and dive deep into the Word of God.', 'Rev. John Doe', 'Head Pastor'
where not exists (select 1 from public.events where title = 'English Service');

insert into public.events (title, day, time, description, detailed_description)
select 'Twi Service', 'Sunday', '9:00 AM - 12:00 PM', 'Join our vibrant Twi speaking service.', 'Experience the power of God in our vernacular service with intense worship and prayers.'
where not exists (select 1 from public.events where title = 'Twi Service');

insert into public.events (title, day, time, description, detailed_description)
select 'Men''s Movement', 'Monday', '6:00 PM - 8:00 PM', 'Fellowship and growth for men.', 'A time for men to gather, encourage one another, and grow in their spiritual walk and leadership roles.'
where not exists (select 1 from public.events where title = 'Men''s Movement');

insert into public.events (title, day, time, description, detailed_description)
select 'Women''s Movement', 'Tuesday', '6:00 PM - 8:00 PM', 'Empowering women in faith and life.', 'Women gathering to support each other, pray, and learn how to apply biblical principles in their daily lives.'
where not exists (select 1 from public.events where title = 'Women''s Movement');

insert into public.events (title, day, time, description, detailed_description)
select 'Bible Studies', 'Wednesday', '6:00 PM - 8:00 PM', 'Deep dive into the Word of God.', 'Interactive sessions where we study the scriptures in depth to understand God''s will and apply it.'
where not exists (select 1 from public.events where title = 'Bible Studies');

insert into public.events (title, day, time, description, detailed_description)
select 'Youth Service', 'Thursday', '6:00 PM - 8:00 PM', 'Dynamic service for the next generation.', 'A vibrant service tailored for the youth, featuring energetic worship, relevant talks, and fellowship.'
where not exists (select 1 from public.events where title = 'Youth Service');
