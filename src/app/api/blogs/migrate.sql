-- Complete blogs table schema — adds ALL fields used by the blog editor
-- Safe to run multiple times (IF NOT EXISTS)
ALTER TABLE blogs
  ADD COLUMN IF NOT EXISTS title TEXT,
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS excerpt TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS author TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS content TEXT,

  -- Images
  ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
  ADD COLUMN IF NOT EXISTS cover_image_alt TEXT,
  ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
  ADD COLUMN IF NOT EXISTS og_image TEXT,
  ADD COLUMN IF NOT EXISTS og_image_alt TEXT,

  -- SEO
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS og_title TEXT,
  ADD COLUMN IF NOT EXISTS og_description TEXT,
  ADD COLUMN IF NOT EXISTS canonical_url TEXT,
  ADD COLUMN IF NOT EXISTS focus_keyword TEXT,
  ADD COLUMN IF NOT EXISTS meta_robots TEXT DEFAULT 'index, follow',
  ADD COLUMN IF NOT EXISTS tags TEXT,
  ADD COLUMN IF NOT EXISTS read_time TEXT,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS allow_search_engines BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS follow_links BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS internal_notes TEXT,
  ADD COLUMN IF NOT EXISTS publish_date TEXT,
  ADD COLUMN IF NOT EXISTS last_modified_date TEXT,

  -- FAQs (JSON array)
  ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]',

  -- CTA Block
  ADD COLUMN IF NOT EXISTS cta_heading TEXT,
  ADD COLUMN IF NOT EXISTS cta_description TEXT,
  ADD COLUMN IF NOT EXISTS cta_button_text TEXT,
  ADD COLUMN IF NOT EXISTS cta_button_link TEXT,

  -- Sidebar Block
  ADD COLUMN IF NOT EXISTS sidebar_heading TEXT,
  ADD COLUMN IF NOT EXISTS sidebar_subheading TEXT,
  ADD COLUMN IF NOT EXISTS sidebar_address TEXT,
  ADD COLUMN IF NOT EXISTS sidebar_phone TEXT,
  ADD COLUMN IF NOT EXISTS sidebar_email TEXT,
  ADD COLUMN IF NOT EXISTS sidebar_button_text TEXT,
  ADD COLUMN IF NOT EXISTS sidebar_button_link TEXT,

  -- Timestamps
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();
