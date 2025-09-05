import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useArticlesWithMeta, useCategories } from '@/hooks/use-strapi';
import { Article } from '@/types/strapi';
import { Search, Filter, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import ArticleCard from '@/components/ArticleCard';
import ArticlePagination from '@/components/ArticlePagination';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

const ARTICLES_PER_PAGE = 12;

const ArticlesListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  
  const currentPage = parseInt(searchParams.get('page') || '1');
  const categoryFilter = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'publishedAt:desc';

  // Fetch articles with filters
  const { 
    data: articlesResponse, 
    isLoading: articlesLoading, 
    error: articlesError
  } = useArticlesWithMeta({
    pagination: { 
      page: currentPage, 
      pageSize: ARTICLES_PER_PAGE 
    },
    sort: [sortBy],
    filters: {
      ...(categoryFilter !== 'all' && {
        category: { slug: { $eq: categoryFilter } }
      }),
      ...(searchTerm && {
        $or: [
          { title: { $containsi: searchTerm } },
          { excerpt: { $containsi: searchTerm } },
          { content: { $containsi: searchTerm } }
        ]
      })
    }
  });

  const articles = articlesResponse?.data || [];
  const articlesMeta = articlesResponse?.meta;

  // Fetch categories for filter
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const totalPages = useMemo(() => {
    return articlesMeta?.pagination ? Math.ceil(articlesMeta.pagination.total / ARTICLES_PER_PAGE) : 1;
  }, [articlesMeta]);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    // Reset to page 1 when filters change
    if ('search' in updates || 'category' in updates || 'sort' in updates) {
      newParams.delete('page');
    }
    setSearchParams(newParams);
  };

  const handleSearch = () => {
    updateSearchParams({ search: searchTerm });
  };

  const handleCategoryChange = (category: string) => {
    updateSearchParams({ category: category === 'all' ? null : category });
  };

  const handleSortChange = (sort: string) => {
    updateSearchParams({ sort });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            All Articles
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover insights, stories, and knowledge from our collection of articles
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publishedAt:desc">Latest First</SelectItem>
                  <SelectItem value="publishedAt:asc">Oldest First</SelectItem>
                  <SelectItem value="title:asc">Title A-Z</SelectItem>
                  <SelectItem value="title:desc">Title Z-A</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleSearch} className="shrink-0">
                Search
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || categoryFilter !== 'all') && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="gap-1">
                  Search: "{searchTerm}"
                  <button onClick={() => { setSearchTerm(''); updateSearchParams({ search: null }); }}>×</button>
                </Badge>
              )}
              {categoryFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  Category: {categories.find(c => c.slug === categoryFilter)?.name || categoryFilter}
                  <button onClick={() => handleCategoryChange('all')}>×</button>
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </motion.div>

        {/* Loading State */}
        {(articlesLoading || categoriesLoading) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {articlesError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          >
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Articles</h3>
            <p className="text-red-600 mb-4">{articlesError.message}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </motion.div>
        )}

        {/* Articles Grid */}
        {!articlesLoading && !articlesError && articles.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {articles.map((article, index) => (
                <Link key={article.id} to={`/articles/${article.slug}`}>
                  <ArticleCard
                    title={article.title}
                    excerpt={article.excerpt}
                    image={article.featuredImage?.url || `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop`}
                    category={article.category?.name || 'Uncategorized'}
                    author={article.author?.username || 'Anonymous'}
                    readTime="5 min read"
                    publishedAt={format(new Date(article.publishedAt), 'MMM dd, yyyy')}
                    views="1.2k"
                    comments="24"
                    index={index}
                  />
                </Link>
              ))}
            </motion.div>

            {/* Pagination */}
            <ArticlePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={articlesMeta?.pagination?.total || 0}
              itemsPerPage={ARTICLES_PER_PAGE}
            />
          </>
        )}

        {/* No Results */}
        {!articlesLoading && !articlesError && articles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || categoryFilter !== 'all' 
                ? "Try adjusting your search or filters" 
                : "No articles have been published yet"}
            </p>
            {(searchTerm || categoryFilter !== 'all') && (
              <Button onClick={clearFilters} variant="outline">
                Clear filters
              </Button>
            )}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArticlesListPage;