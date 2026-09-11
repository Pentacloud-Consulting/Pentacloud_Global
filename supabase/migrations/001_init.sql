-- Migration: 001_init.sql

-- Blogs Table
CREATE TABLE public.blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text,
  excerpt text,
  cover_image_url text,
  category text,
  author text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  meta_title text,
  meta_description text,
  og_image_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  published_at timestamp with time zone
);

-- Media Table
CREATE TABLE public.media (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  url text NOT NULL,
  filename text NOT NULL,
  alt_text text,
  uploaded_at timestamp with time zone DEFAULT now()
);

-- Redirects Table
CREATE TABLE public.redirects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  old_url text NOT NULL UNIQUE,
  new_url text NOT NULL,
  type integer DEFAULT 301 CHECK (type IN (301, 302)),
  created_at timestamp with time zone DEFAULT now()
);

-- Leads Table
CREATE TABLE public.leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  source_page text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at timestamp with time zone DEFAULT now()
);

-- Career Applications Table
CREATE TABLE public.career_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  position text,
  resume_url text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'rejected', 'hired')),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

-- Blogs Policies
CREATE POLICY "Allow public to read published blogs"
ON public.blogs FOR SELECT
USING (status = 'published');

CREATE POLICY "Allow admins to do everything on blogs"
ON public.blogs FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Media Policies
CREATE POLICY "Allow public to read media"
ON public.media FOR SELECT
USING (true);

CREATE POLICY "Allow admins to do everything on media"
ON public.media FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Redirects Policies
CREATE POLICY "Allow public to read redirects"
ON public.redirects FOR SELECT
USING (true);

CREATE POLICY "Allow admins to do everything on redirects"
ON public.redirects FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Leads Policies
CREATE POLICY "Allow public to insert leads"
ON public.leads FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow admins to read and update leads"
ON public.leads FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow admins to update leads"
ON public.leads FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow admins to delete leads"
ON public.leads FOR DELETE
TO authenticated
USING (true);

-- Career Applications Policies
CREATE POLICY "Allow public to insert career applications"
ON public.career_applications FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow admins to read and update career applications"
ON public.career_applications FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow admins to update career applications"
ON public.career_applications FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow admins to delete career applications"
ON public.career_applications FOR DELETE
TO authenticated
USING (true);
