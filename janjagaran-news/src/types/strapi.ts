/**
 * Strapi Content Types
 * 
 * These types correspond to the Strapi content types you need to create in your Strapi admin panel.
 * 
 * CONTENT TYPE SETUP IN STRAPI ADMIN:
 * 
 * 1. Create 'article' content type with these fields:
 *    - title: Text (Short text, Required)
 *    - slug: UID (Target field: title, Required)
 *    - content: Rich text (Required)
 *    - excerpt: Text (Long text, Optional)  
 *    - category: Relation (Many to One with Category)
 *    - featuredImage: Media (Single media, Optional)
 *    - publishedAt: Date (Date & time, Optional)
 *    - author: Relation (Many to One with User)
 *    - tags: Text (Optional, for comma-separated tags)
 *    - seo: Component (Optional, for SEO meta data)
 * 
 * 2. Create 'category' content type with these fields:
 *    - name: Text (Short text, Required)
 *    - slug: UID (Target field: name, Required)
 *    - description: Text (Long text, Optional)
 *    - color: Text (Short text, Optional, for UI theming)
 * 
 * 3. Configure permissions in Settings > Users & Permissions Plugin > Roles > Public:
 *    - article: find, findOne
 *    - category: find, findOne
 */

// Base Strapi types
export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
}

export interface StrapiUser {
  id: number;
  attributes: {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

// Content type: Category
export interface StrapiCategoryAttributes {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiCategory {
  id: number;
  attributes: StrapiCategoryAttributes;
}

// Content type: Article
export interface StrapiArticleAttributes {
  title: string;
  slug: string;
  content?: string;
  description?: string;
  excerpt?: string;
  tags?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featuredImage?: {
    data: StrapiImage | null;
  };
  category?: {
    data: StrapiCategory | null;
  };
  author?: {
    data: StrapiUser | null;
  };
}

export interface StrapiArticle {
  id: number;
  documentId?: string;
  attributes?: StrapiArticleAttributes;
  // For direct API responses without attributes wrapper
  title?: string;
  slug?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

// API Response types
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiCollectionResponse<T> extends StrapiResponse<T[]> {}
export interface StrapiSingleResponse<T> extends StrapiResponse<T> {}

// Query parameters
export interface StrapiQueryParams {
  sort?: string | string[];
  filters?: Record<string, any>;
  populate?: string | string[] | Record<string, any>;
  fields?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  publicationState?: 'live' | 'preview';
  locale?: string;
}

// Frontend-friendly types (transformed from Strapi responses)
export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  featuredImage: {
    id: number;
    url: string;
    alternativeText: string;
    width: number;
    height: number;
    formats: StrapiImageFormat[];
  } | null;
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
    color: string;
  } | null;
  author: {
    id: number;
    username: string;
    email: string;
  } | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

// Error types
export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, any>;
}

export interface StrapiValidationError {
  path: string[];
  message: string;
  name: string;
}