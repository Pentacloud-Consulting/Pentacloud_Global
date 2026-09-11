-- Run this in your Supabase SQL Editor
-- Go to: https://supabase.com → Your Project → SQL Editor → New Query

CREATE TABLE IF NOT EXISTS tracked_keywords (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword    text NOT NULL,
  location   text DEFAULT 'English / India',
  created_at timestamptz DEFAULT now()
);

-- Allow all dashboard users to read/insert/delete
ALTER TABLE tracked_keywords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users"
  ON tracked_keywords
  FOR ALL
  USING (true)
  WITH CHECK (true);
