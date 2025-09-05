/**
 * React Query hooks for Strapi data fetching
 * 
 * These hooks provide a clean interface for fetching and caching Strapi data
 * with React Query for optimal performance and user experience.
 */

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import strapiApi from '@/lib/strapi-api';
import { Article, Category, StrapiQueryParams, StrapiError } from '@/types/strapi';

// Query keys
export const strapiQueryKeys = {
  articles: ['articles'] as const,
  article: (id: number) => ['articles', id] as const,
  articleBySlug: (slug: string) => ['articles', 'slug', slug] as const,
  featuredArticles: (limit: number) => ['articles', 'featured', limit] as const,
  articlesByCategory: (categorySlug: string, params?: StrapiQueryParams) => 
    ['articles', 'category', categorySlug, params] as const,
  categories: ['categories'] as const,
  category: (id: number) => ['categories', id] as const,
  categoryBySlug: (slug: string) => ['categories', 'slug', slug] as const,
};

// Articles hooks
export function useArticles(
  params: StrapiQueryParams = {},
  options?: UseQueryOptions<Article[], StrapiError>
): UseQueryResult<Article[], StrapiError> {
  return useQuery({
    queryKey: [...strapiQueryKeys.articles, params],
    queryFn: async () => {
      const response = await strapiApi.getArticles(params);
      return response.data.map(article => strapiApi.transformArticle(article));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}

export function useArticlesWithMeta(
  params: StrapiQueryParams = {},
  options?: UseQueryOptions<{ data: Article[], meta: any }, StrapiError>
): UseQueryResult<{ data: Article[], meta: any }, StrapiError> {
  return useQuery({
    queryKey: [...strapiQueryKeys.articles, 'with-meta', params],
    queryFn: async () => {
      const response = await strapiApi.getArticles(params);
      return {
        data: response.data.map(article => strapiApi.transformArticle(article)),
        meta: response.meta
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}

export function useArticle(
  id: number,
  params: StrapiQueryParams = {},
  options?: UseQueryOptions<Article, StrapiError>
): UseQueryResult<Article, StrapiError> {
  return useQuery({
    queryKey: [...strapiQueryKeys.article(id), params],
    queryFn: async () => {
      const response = await strapiApi.getArticle(id, params);
      return strapiApi.transformArticle(response.data);
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!id,
    ...options,
  });
}

export function useArticleBySlug(
  slug: string,
  params: StrapiQueryParams = {},
  options?: UseQueryOptions<Article | null, StrapiError>
): UseQueryResult<Article | null, StrapiError> {
  return useQuery({
    queryKey: [...strapiQueryKeys.articleBySlug(slug), params],
    queryFn: async () => {
      const response = await strapiApi.getArticleBySlug(slug, params);
      const article = response.data[0];
      return article ? strapiApi.transformArticle(article) : null;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!slug,
    ...options,
  });
}

export function useFeaturedArticles(
  limit: number = 6,
  options?: UseQueryOptions<Article[], StrapiError>
): UseQueryResult<Article[], StrapiError> {
  return useQuery({
    queryKey: strapiQueryKeys.featuredArticles(limit),
    queryFn: async () => {
      const response = await strapiApi.getFeaturedArticles(limit);
      return response.data.map(article => strapiApi.transformArticle(article));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
}

export function useArticlesByCategory(
  categorySlug: string,
  params: StrapiQueryParams = {},
  options?: UseQueryOptions<Article[], StrapiError>
): UseQueryResult<Article[], StrapiError> {
  return useQuery({
    queryKey: strapiQueryKeys.articlesByCategory(categorySlug, params),
    queryFn: async () => {
      const response = await strapiApi.getArticlesByCategory(categorySlug, params);
      return response.data.map(article => strapiApi.transformArticle(article));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!categorySlug,
    ...options,
  });
}

// Categories hooks
export function useCategories(
  params: StrapiQueryParams = {},
  options?: UseQueryOptions<Category[], StrapiError>
): UseQueryResult<Category[], StrapiError> {
  return useQuery({
    queryKey: [...strapiQueryKeys.categories, params],
    queryFn: async () => {
      const response = await strapiApi.getCategories(params);
      return response.data.map(category => strapiApi.transformCategory(category));
    },
    staleTime: 1000 * 60 * 15, // 15 minutes (categories change less frequently)
    ...options,
  });
}

export function useCategory(
  id: number,
  options?: UseQueryOptions<Category, StrapiError>
): UseQueryResult<Category, StrapiError> {
  return useQuery({
    queryKey: strapiQueryKeys.category(id),
    queryFn: async () => {
      const response = await strapiApi.getCategory(id);
      return strapiApi.transformCategory(response.data);
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    enabled: !!id,
    ...options,
  });
}

export function useCategoryBySlug(
  slug: string,
  options?: UseQueryOptions<Category | null, StrapiError>
): UseQueryResult<Category | null, StrapiError> {
  return useQuery({
    queryKey: strapiQueryKeys.categoryBySlug(slug),
    queryFn: async () => {
      const response = await strapiApi.getCategoryBySlug(slug);
      const category = response.data[0];
      return category ? strapiApi.transformCategory(category) : null;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    enabled: !!slug,
    ...options,
  });
}

// Utility hooks
export function usePreloadArticle(id: number) {
  const queryClient = useQueryClient();
  
  return (params: StrapiQueryParams = {}) => {
    queryClient.prefetchQuery({
      queryKey: [...strapiQueryKeys.article(id), params],
      queryFn: async () => {
        const response = await strapiApi.getArticle(id, params);
        return strapiApi.transformArticle(response.data);
      },
      staleTime: 1000 * 60 * 10,
    });
  };
}

// Import useQueryClient for utility hooks
import { useQueryClient } from '@tanstack/react-query';