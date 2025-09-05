import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  thumbnail_url: string | null;
  author_id: string;
  category: string;
  tags: string[] | null;
  status: 'draft' | 'published' | 'scheduled';
  scheduled_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    display_name: string | null;
  };
}

interface RawBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  thumbnail_url: string | null;
  author_id: string;
  category: string;
  tags: string[] | null;
  status: string;
  scheduled_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  profiles?: any; // Supabase can return different types here
}

export const useBlog = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transformRawPost = (raw: any): BlogPost => ({
    ...raw,
    status: raw.status as 'draft' | 'published' | 'scheduled',
    profiles: raw.profiles && typeof raw.profiles === 'object' && 'display_name' in raw.profiles 
      ? { display_name: raw.profiles.display_name } 
      : undefined
  });

  const fetchPublishedPosts = async (searchQuery = '', category = '') => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          profiles:profiles!blog_posts_author_id_fkey(display_name)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`);
      }

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts((data || []).map(transformRawPost));
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPosts = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles:profiles!blog_posts_author_id_fkey(display_name)
        `)
        .eq('author_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts((data || []).map(transformRawPost));
    } catch (err) {
      console.error('Error fetching my posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles:profiles!blog_posts_author_id_fkey(display_name)
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      return transformRawPost(data);
    } catch (err) {
      console.error('Error fetching post by slug:', err);
      return null;
    }
  };

  const createPost = async (postData: Partial<BlogPost>) => {
    if (!user) throw new Error('User must be authenticated');
    
    const slug = postData.slug || generateSlug(postData.title || '');
    
    // Clean the data to match database expectations
    const { profiles, ...cleanData } = postData as any;
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: cleanData.title || '',
        content: cleanData.content || '',
        author_id: user.id,
        slug,
        excerpt: cleanData.excerpt || null,
        thumbnail_url: cleanData.thumbnail_url || null,
        category: cleanData.category || 'general',
        tags: cleanData.tags || null,
        status: cleanData.status || 'draft',
        scheduled_at: cleanData.scheduled_at || null,
        published_at: cleanData.status === 'published' ? new Date().toISOString() : null
      })
      .select()
      .single();

    if (error) throw error;
    return transformRawPost(data);
  };

  const updatePost = async (id: string, postData: Partial<BlogPost>) => {
    if (!user) throw new Error('User must be authenticated');
    
    // Clean the data to match database expectations
    const { profiles, ...cleanData } = postData as any;
    
    const updateData: any = { ...cleanData };
    
    if (postData.status === 'published' && !postData.published_at) {
      updateData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .eq('author_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return transformRawPost(data);
  };

  const deletePost = async (id: string) => {
    if (!user) throw new Error('User must be authenticated');
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
      .eq('author_id', user.id);

    if (error) throw error;
  };

  return {
    posts,
    loading,
    error,
    fetchPublishedPosts,
    fetchMyPosts,
    fetchPostBySlug,
    createPost,
    updatePost,
    deletePost,
  };
};

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};