-- Create foreign key relationship between blog_posts and profiles
ALTER TABLE public.blog_posts 
ADD CONSTRAINT blog_posts_author_id_fkey 
FOREIGN KEY (author_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true);

-- Create RLS policies for blog images storage
CREATE POLICY "Authenticated users can upload blog images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'blog-images' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Blog images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-images');

CREATE POLICY "Users can update their blog images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'blog-images' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete their blog images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'blog-images' AND 
  auth.role() = 'authenticated'
);