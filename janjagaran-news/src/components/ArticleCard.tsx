import { motion } from "framer-motion";
import { Clock, User, Eye, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
    title: string;
    excerpt?: string;
    description?: string;
    image?: string;
    category?: string;
    author?: string;
    readTime?: string;
    publishedAt: string;
    views?: string;
    comments?: string;
    index: number;
}

const ArticleCard = ({ 
    title, 
    excerpt, 
    description,
    image, 
    category, 
    author, 
    readTime, 
    publishedAt, 
    views, 
    comments,
    index 
}: ArticleCardProps) => {
    // Use excerpt if available, otherwise use description, otherwise use a default
    const articleExcerpt = excerpt || description || 'No description available';
    
    // Format the published date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return date.toLocaleDateString();
    };
    
    // Default image if none provided
    const defaultImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
    return (
        <motion.article
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
            {/* Image container */}
            <div className="relative overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={image || defaultImage}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category badge */}
                {category && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        {category}
                    </Badge>
                )}

                {/* Read time */}
                {readTime && (
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                        {readTime}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <motion.h3
                    className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer"
                    whileHover={{ x: 4 }}
                >
                    {title}
                </motion.h3>

                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {articleExcerpt}
                </p>

                {/* Meta information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                        {author && (
                            <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{author}</span>
                            </div>
                        )}
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatDate(publishedAt)}</span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                        {views && (
                            <div className="flex items-center space-x-1 text-gray-500">
                                <Eye className="w-4 h-4" />
                                <span className="text-sm">{views}</span>
                            </div>
                        )}
                        {comments && (
                            <div className="flex items-center space-x-1 text-gray-500">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm">{comments}</span>
                            </div>
                        )}
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors cursor-pointer"
                    >
                        Read More →
                    </motion.div>
                </div>
            </div>
        </motion.article>
    );
};

export default ArticleCard;