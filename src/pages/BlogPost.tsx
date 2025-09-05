import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBlog, BlogPost as BlogPostType } from '@/hooks/useBlog';
import { Calendar, User, ArrowLeft, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { fetchPostBySlug } = useBlog();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const whatsappLink = "https://wa.me/254797960352?text=Hi! I'd like to work with Baun on my project.";

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('No post slug provided');
        setLoading(false);
        return;
      }

      try {
        const postData = await fetchPostBySlug(slug);
        if (postData) {
          setPost(postData);
        } else {
          setError('Post not found');
          navigate('/blog');
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, fetchPostBySlug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8" />
            <div className="aspect-video bg-muted rounded mb-8" />
            <div className="h-12 bg-muted rounded w-3/4 mb-4" />
            <div className="h-6 bg-muted rounded w-1/2 mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="h-4 bg-muted rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/blog" className="flex items-center gap-2 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/lovable-uploads/d8e4b495-ac53-45e0-8906-0fcf2ea8225a.png"
                alt="Baun logo"
                className="h-8 w-8"
              />
              <span className="font-semibold">Baun</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Hero Image */}
        {post.thumbnail_url && (
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img
              src={post.thumbnail_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="h-4 w-4" />
            {post.published_at && format(new Date(post.published_at), 'MMMM dd, yyyy')}
            {post.profiles?.display_name && (
              <>
                <span className="mx-2">•</span>
                <User className="h-4 w-4" />
                {post.profiles.display_name}
              </>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-lg text-muted-foreground mb-6">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex gap-2 flex-wrap">
            <Badge variant="default">{post.category}</Badge>
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </header>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-16 p-8 bg-primary/5 rounded-lg border text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Transform Your Brand?
          </h3>
          <p className="text-muted-foreground mb-6">
            Let's create something bold together. Get in touch to start your project.
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg">
              Start Your Project <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
      </article>

      {/* Footer CTA */}
      <section className="bg-foreground text-background py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-4">
            Explore More Insights
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Discover more design inspiration and brand strategy tips.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/blog">
              <Button variant="secondary" size="lg">
                View All Posts
              </Button>
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="bg-transparent border-background text-background hover:bg-background hover:text-foreground">
                Work With Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;