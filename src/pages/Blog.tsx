import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBlog, BlogPost } from '@/hooks/useBlog';
import { Search, Calendar, User, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

const Blog = () => {
  const { posts, loading, fetchPublishedPosts } = useBlog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchPublishedPosts(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    // Extract unique categories from posts
    const uniqueCategories = Array.from(new Set(posts.map(post => post.category)));
    setCategories(uniqueCategories);
  }, [posts]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const whatsappLink = "https://wa.me/254797960352?text=Hi! I'd like to work with Baun on my project.";

  const BlogPostCard = ({ post }: { post: BlogPost }) => (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      {post.thumbnail_url && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img
            src={post.thumbnail_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          {post.published_at && format(new Date(post.published_at), 'MMM dd, yyyy')}
          {post.profiles?.display_name && (
            <>
              <User className="h-4 w-4 ml-2" />
              {post.profiles.display_name}
            </>
          )}
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </CardTitle>
        {post.excerpt && (
          <CardDescription className="line-clamp-3">
            {post.excerpt}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">{post.category}</Badge>
            {post.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
          <Link to={`/blog/${post.slug}`}>
            <Button variant="ghost" size="sm">
              Read More <ExternalLink className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Insights & Stories
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Design inspiration, brand strategy tips, and creative insights from the Baun team.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                Work With Us
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/lovable-uploads/d8e4b495-ac53-45e0-8906-0fcf2ea8225a.png"
                alt="Baun logo"
                className="h-8 w-8"
              />
              <span className="font-semibold">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Search and Filters */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-muted rounded-t-lg" />
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-6 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-lg font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Check back soon for new content!'
              }
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button>
                Contact Us
              </Button>
            </a>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-4">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Let's create something bold together.
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg">
              Start Your Project
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Blog;