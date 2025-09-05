import { useState, useEffect } from 'react';
import { StrapiArticle, StrapiCollectionResponse } from '@/types/strapi';

interface UseArticlesResult {
  articles: StrapiArticle[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useArticles = (): UseArticlesResult => {
  const [articles, setArticles] = useState<StrapiArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:1337/api/articles');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: StrapiCollectionResponse<StrapiArticle> = await response.json();
      setArticles(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching articles');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    loading,
    error,
    refetch: fetchArticles,
  };
};
