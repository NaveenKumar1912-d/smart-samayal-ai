-- Create recipes table
CREATE TABLE public.recipes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  category TEXT NOT NULL,
  ingredients TEXT[] NOT NULL,
  steps TEXT[] NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read recipes
CREATE POLICY "Anyone can view recipes"
  ON public.recipes
  FOR SELECT
  USING (true);

-- Create storage bucket for recipe data
INSERT INTO storage.buckets (id, name, public)
VALUES ('recipe-data', 'recipe-data', true);

-- Create storage policy for public read access
CREATE POLICY "Public can view recipe data"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'recipe-data');