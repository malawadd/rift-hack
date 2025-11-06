/*
  # Create Data Dragon Cache Tables

  1. New Tables
    - `data_dragon_versions`
      - `id` (uuid, primary key)
      - `version` (text, unique) - Latest Data Dragon version
      - `last_updated` (timestamptz) - When it was last fetched
      - `created_at` (timestamptz)
    
    - `champions_cache`
      - `id` (uuid, primary key)
      - `champion_id` (text, unique) - Champion identifier
      - `champion_name` (text) - Display name
      - `champion_data` (jsonb) - Full champion data from Data Dragon
      - `square_image_url` (text) - URL to square icon
      - `splash_image_url` (text) - URL to splash art
      - `last_updated` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read data
    - Only authenticated users can insert/update cache data
    
  3. Indexes
    - Add index on champion_name for faster searches
    - Add index on last_updated for cache invalidation
*/

-- Create data_dragon_versions table
CREATE TABLE IF NOT EXISTS data_dragon_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version text UNIQUE NOT NULL,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create champions_cache table
CREATE TABLE IF NOT EXISTS champions_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  champion_id text UNIQUE NOT NULL,
  champion_name text NOT NULL,
  champion_data jsonb DEFAULT '{}'::jsonb,
  square_image_url text,
  splash_image_url text,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_champions_cache_name ON champions_cache(champion_name);
CREATE INDEX IF NOT EXISTS idx_champions_cache_updated ON champions_cache(last_updated);
CREATE INDEX IF NOT EXISTS idx_data_dragon_versions_updated ON data_dragon_versions(last_updated);

-- Enable Row Level Security
ALTER TABLE data_dragon_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE champions_cache ENABLE ROW LEVEL SECURITY;

-- Policies for data_dragon_versions
CREATE POLICY "Anyone can read Data Dragon versions"
  ON data_dragon_versions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert Data Dragon versions"
  ON data_dragon_versions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update Data Dragon versions"
  ON data_dragon_versions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for champions_cache
CREATE POLICY "Anyone can read champion cache"
  ON champions_cache FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert champion cache"
  ON champions_cache FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update champion cache"
  ON champions_cache FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
