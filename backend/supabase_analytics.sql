-- Create the analytics table
create table if not exists public.analytics (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  user_agent text,
  session_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS to keep it secure from anonymous writes via the frontend keys
alter table public.analytics enable row level security;

-- (Optional) If you want the backend to query this, the service_role key bypasses RLS anyway.
-- No public policies needed.
