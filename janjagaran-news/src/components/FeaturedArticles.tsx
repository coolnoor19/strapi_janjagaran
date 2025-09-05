import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { useArticles } from "@/hooks/use-articles";
import { StrapiArticle } from "@/types/strapi";

const FeaturedArticles = () => {
    const { articles, loading, error } = useArticles();

    // Transform Strapi articles to ArticleCard format
    const transformArticle = (article: StrapiArticle) => {
        return {
            title: article.title || article.attributes?.title || 'Untitled',
            description: article.description || article.attributes?.description || '',
            excerpt: article.attributes?.excerpt || '',
            image: article.attributes?.featuredImage?.data?.attributes?.url || undefined,
            category: article.attributes?.category?.data?.attributes?.name || 'General',
            author: article.attributes?.author?.data?.attributes?.username || 'Anonymous',
            readTime: '5 min read', // Default read time since it's not in the API
            publishedAt: article.publishedAt || article.attributes?.publishedAt || new Date().toISOString(),
            views: '1.2k', // Default views since it's not in the API
            comments: '0' // Default comments since it's not in the API
        };
    };

    if (loading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading articles...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="text-red-600 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load articles</h3>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Featured Stories
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover the most important stories shaping our world today, 
                        curated by our expert editorial team.
                    </p>
                </motion.div>

                {/* Featured grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {articles.map((article, index) => (
                        <ArticleCard
                            key={article.id || index}
                            {...transformArticle(article)}
                            index={index}
                        />
                    ))}
                </div>

                {/* Load more section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-center"
                >
                    <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
                    >
                        Load More Articles
                    </Button>
                    <p className="text-gray-500 mt-4">
                        Showing {articles.length} articles
                    </p>
                </motion.div>

                {/* Newsletter signup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-16 bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Never Miss a Story
                        </h3>
                        <p className="text-gray-600 mb-8 text-lg">
                            Get breaking news, in-depth analysis, and expert commentary delivered directly to your inbox.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Button 
                                size="lg" 
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 rounded-full"
                            >
                                Subscribe Now
                            </Button>
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-4">
                            Join 2.8 million subscribers. No spam, unsubscribe anytime.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedArticles;