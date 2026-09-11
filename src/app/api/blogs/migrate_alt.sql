-- Add missing alt text columns for images in the blogs table
ALTER TABLE blogs
  ADD COLUMN IF NOT EXISTS cover_image_alt TEXT,
  ADD COLUMN IF NOT EXISTS thumbnail_alt TEXT,
  ADD COLUMN IF NOT EXISTS og_image_alt TEXT;
