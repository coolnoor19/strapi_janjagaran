import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useArticleBySlug, useArticles } from '@/hooks/use-strapi';
import { format } from 'date-fns';
import { 
  Clock, 
  User, 
  Calendar, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Eye,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import ShareButtons from '@/components/ShareButtons';

const ArticleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { 
    data: article, 
    isLoading, 
    error 
  } = useArticleBySlug(slug || '', {
    populate: ['featuredImage', 'category', 'author']
  });

  // Fetch related articles from the same category
  const { data: relatedArticles = [] } = useArticles({
    filters: article?.category ? {
      category: { slug: { $eq: article.category.slug } },
      slug: { $ne: article.slug }
    } : undefined,
    pagination: { pageSize: 3 },
    populate: ['featuredImage', 'category', 'author']
  }, { enabled: !!article });

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = article?.title || 'Check out this article';

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url);
        toast({ title: 'Link copied to clipboard!' });
      } catch {
        toast({ title: 'Failed to copy link', variant: 'destructive' });
      }
      return;
    }

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (platform && shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-8 mt-20">
          <div className="max-w-4xl mx-auto">
            {/* Back button skeleton */}
            <Skeleton className="h-10 w-24 mb-6" />
            
            {/* Article header skeleton */}
            <div className="mb-8">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="w-full h-64 rounded-2xl" />
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-8 mt-20">
          <div className="max-w-2xl mx-auto text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {error ? 'Failed to Load Article' : 'Article Not Found'}
            </h1>
            <p className="text-gray-600 mb-8">
              {error?.message || "The article you're looking for doesn't exist or has been removed."}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button asChild>
                <Link to="/articles">Browse Articles</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Category Badge */}
            {article.category && (
              <Link to={`/articles?category=${article.category.slug}`}>
                <Badge 
                  className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer"
                >
                  {article.category.name}
                </Badge>
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{article.author.username}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(article.publishedAt), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>1.2k views</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <ShareButtons 
                url={window.location.href}
                title={article.title}
                onShare={handleShare}
              />
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden shadow-xl mb-8"
              >
                <img
                  src={article.featuredImage.url}
                  alt={article.featuredImage.alternativeText || article.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            )}
          </motion.header>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none mb-12"
          >
            <div 
              className="text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </motion.article>

          {/* Tags */}
          {article.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}

          <Separator className="my-12" />

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-xl font-semibold mb-4">Share this article</h3>
            <ShareButtons 
              url={window.location.href}
              title={article.title}
              onShare={handleShare}
              size="lg"
            />
          </motion.div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Related Articles</h3>
                <p className="text-gray-600">Continue exploring similar topics</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle, index) => (
                  <Link key={relatedArticle.id} to={`/articles/${relatedArticle.slug}`}>
                    <ArticleCard
                      title={relatedArticle.title}
                      excerpt={relatedArticle.excerpt}
                      image={relatedArticle.featuredImage?.url || `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop`}
                      category={relatedArticle.category?.name || 'Uncategorized'}
                      author={relatedArticle.author?.username || 'Anonymous'}
                      readTime="5 min read"
                      publishedAt={format(new Date(relatedArticle.publishedAt), 'MMM dd, yyyy')}
                      views="1.2k"
                      comments="24"
                      index={index}
                    />
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Navigation to Articles List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <Button asChild size="lg">
              <Link to="/articles">
                Browse More Articles
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetailPage;