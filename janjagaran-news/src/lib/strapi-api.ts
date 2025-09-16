/**
 * Strapi API Service Layer
 * 
 * This service layer provides a clean interface for communicating with Strapi API.
 * It handles both Strapi Cloud and self-hosted deployments automatically based on configuration.
 */

import {
  StrapiArticle,
  StrapiCategory,
  StrapiCollectionResponse,
  StrapiSingleResponse,
  StrapiQueryParams,
  Article,
  Category,
  StrapiError,
} from '@/types/strapi';
import strapiConfig from './strapi-config';

// Mock data for demo mode
// const mockArticles: StrapiArticle[] = [
//   {
//     id: 1,
//     attributes: {
//       title: "Breaking: Major Tech Breakthrough Announced",
//       slug: "major-tech-breakthrough-announced",
//       content: "In a groundbreaking development that promises to reshape the technological landscape, researchers have announced a significant breakthrough in quantum computing. This advancement could revolutionize everything from cryptography to artificial intelligence.\n\nThe discovery, made by a team of international scientists, demonstrates unprecedented quantum coherence stability at room temperature. This breakthrough addresses one of the most significant challenges in quantum computing - maintaining quantum states without requiring extreme cooling.\n\n## Key Implications\n\nThis development has far-reaching implications for:\n\n- **Data Security**: Enhanced encryption capabilities\n- **AI Development**: Exponentially faster machine learning algorithms\n- **Scientific Research**: Accelerated simulation of complex systems\n- **Financial Systems**: More secure and efficient transaction processing\n\nExperts predict this could lead to practical quantum computers becoming available to businesses within the next decade, marking a new era in computational power.",
//       excerpt: "Researchers announce a revolutionary quantum computing breakthrough that maintains stability at room temperature, promising to transform technology as we know it.",
//       tags: "technology,quantum computing,breakthrough,science",
//       publishedAt: "2024-01-15T10:00:00.000Z",
//       createdAt: "2024-01-15T09:00:00.000Z",
//       updatedAt: "2024-01-15T10:00:00.000Z",
//       featuredImage: {
//         data: {
//           id: 1,
//           attributes: {
//             url: "/uploads/quantum_computing.jpg",
//             alternativeText: "Quantum computing breakthrough visualization",
//             width: 1200,
//             height: 800,
//             formats: {}
//           }
//         }
//       },
//       category: {
//         data: {
//           id: 1,
//           attributes: {
//             name: "Technology",
//             slug: "technology",
//             description: "Latest technology news and innovations",
//             color: "#3B82F6"
//           }
//         }
//       },
//       author: {
//         data: {
//           id: 1,
//           attributes: {
//             username: "Dr. Sarah Chen",
//             email: "s.chen@example.com"
//           }
//         }
//       }
//     }
//   },
//   {
//     id: 2,
//     attributes: {
//       title: "Global Climate Summit Reaches Historic Agreement",
//       slug: "global-climate-summit-historic-agreement",
//       content: "World leaders have reached a landmark agreement at the Global Climate Summit, setting ambitious targets for carbon neutrality and renewable energy adoption. This historic accord represents the most comprehensive climate action plan to date.\n\nThe agreement includes binding commitments from 195 countries to:\n\n## Key Commitments\n\n- **Carbon Neutrality**: Achieve net-zero emissions by 2050\n- **Renewable Energy**: Transition to 80% renewable energy by 2035\n- **Forest Protection**: End deforestation and restore 1 billion hectares\n- **Green Finance**: $1 trillion annual investment in clean technology\n\n## Implementation Strategy\n\nThe plan includes a comprehensive monitoring system with quarterly reviews and penalties for non-compliance. Developing nations will receive financial and technological support to meet these ambitious goals.\n\nEnvironmental groups have hailed this as a 'turning point' in the fight against climate change, while economists predict it will drive the largest economic transformation since the industrial revolution.",
//       excerpt: "195 countries unite in historic climate agreement, setting binding targets for carbon neutrality and massive renewable energy investment.",
//       tags: "climate,environment,politics,global,sustainability",
//       publishedAt: "2024-01-14T08:00:00.000Z",
//       createdAt: "2024-01-14T07:00:00.000Z",
//       updatedAt: "2024-01-14T08:00:00.000Z",
//       featuredImage: {
//         data: {
//           id: 2,
//           attributes: {
//             url: "/uploads/climate_summit.jpg",
//             alternativeText: "Global climate summit meeting",
//             width: 1200,
//             height: 800,
//             formats: {}
//           }
//         }
//       },
//       category: {
//         data: {
//           id: 2,
//           attributes: {
//             name: "Environment",
//             slug: "environment",
//             description: "Environmental news and climate change coverage",
//             color: "#10B981"
//           }
//         }
//       },
//       author: {
//         data: {
//           id: 2,
//           attributes: {
//             username: "Michael Rodriguez",
//             email: "m.rodriguez@example.com"
//           }
//         }
//       }
//     }
//   },
//   {
//     id: 3,
//     attributes: {
//       title: "Revolutionary Medical Treatment Shows Promise in Clinical Trials",
//       slug: "revolutionary-medical-treatment-clinical-trials",
//       content: "A groundbreaking medical treatment has shown remarkable success in Phase III clinical trials, offering new hope for patients with previously untreatable conditions. The innovative therapy combines gene editing with personalized medicine approaches.\n\n## Trial Results\n\nThe clinical trial involving 500 patients across 12 countries showed:\n\n- **85% Success Rate**: Significant improvement in patient outcomes\n- **Minimal Side Effects**: Lower adverse reactions than traditional treatments\n- **Long-term Efficacy**: Benefits sustained for over 18 months\n- **Quality of Life**: Dramatic improvement in daily functioning\n\n## How It Works\n\nThe treatment uses CRISPR-Cas9 technology to modify specific genes while simultaneously delivering personalized molecular therapy. This dual approach targets both the underlying genetic causes and current symptoms.\n\n## Next Steps\n\nResearchers are now preparing for regulatory approval and expect the treatment to be available within two years. The therapy could benefit millions of patients worldwide and represents a new paradigm in precision medicine.",
//       excerpt: "Groundbreaking gene therapy shows 85% success rate in clinical trials, offering hope for patients with previously untreatable conditions.",
//       tags: "medicine,healthcare,clinical trials,gene therapy,innovation",
//       publishedAt: "2024-01-13T14:30:00.000Z",
//       createdAt: "2024-01-13T13:30:00.000Z",
//       updatedAt: "2024-01-13T14:30:00.000Z",
//       featuredImage: {
//         data: {
//           id: 3,
//           attributes: {
//             url: "/uploads/medical_research.jpg",
//             alternativeText: "Medical research laboratory",
//             width: 1200,
//             height: 800,
//             formats: {}
//           }
//         }
//       },
//       category: {
//         data: {
//           id: 3,
//           attributes: {
//             name: "Health",
//             slug: "health",
//             description: "Health and medical news",
//             color: "#EF4444"
//           }
//         }
//       },
//       author: {
//         data: {
//           id: 3,
//           attributes: {
//             username: "Dr. Emily Watson",
//             email: "e.watson@example.com"
//           }
//         }
//       }
//     }
//   },
//   {
//     id: 4,
//     attributes: {
//       title: "Space Mission Successfully Lands on Mars, Discovers Water Ice",
//       slug: "mars-mission-discovers-water-ice",
//       content: "The latest Mars exploration mission has achieved a historic milestone by successfully landing near the planet's south pole and immediately discovering significant deposits of water ice just beneath the surface.\n\n## Mission Highlights\n\nThe robotic lander, equipped with advanced drilling equipment, made several key discoveries:\n\n- **Water Ice Deposits**: Large quantities found at shallow depths\n- **Organic Compounds**: Traces of complex organic molecules detected\n- **Atmospheric Data**: Detailed weather and atmospheric composition analysis\n- **Geological Samples**: Rock samples showing signs of ancient water activity\n\n## Scientific Significance\n\nThis discovery has profound implications for:\n\n### Future Human Missions\n- Water could be converted to drinking water and rocket fuel\n- Reduces the need to transport resources from Earth\n- Enables longer-duration missions and permanent settlements\n\n### Astrobiology Research\n- Organic compounds suggest potential for past or present microbial life\n- Water ice preservation may have protected biosignatures\n- Opens new avenues for life-detection experiments\n\nThe mission team is now planning extended operations to analyze the samples and search for signs of past or present microbial life.",
//       excerpt: "Historic Mars mission discovers significant water ice deposits and organic compounds, advancing prospects for human colonization and search for life.",
//       tags: "space,mars,exploration,water,science",
//       publishedAt: "2024-01-12T16:00:00.000Z",
//       createdAt: "2024-01-12T15:00:00.000Z",
//       updatedAt: "2024-01-12T16:00:00.000Z",
//       featuredImage: {
//         data: {
//           id: 4,
//           attributes: {
//             url: "/uploads/mars_mission.jpg",
//             alternativeText: "Mars rover on the red planet surface",
//             width: 1200,
//             height: 800,
//             formats: {}
//           }
//         }
//       },
//       category: {
//         data: {
//           id: 4,
//           attributes: {
//             name: "Science",
//             slug: "science",
//             description: "Scientific discoveries and research",
//             color: "#8B5CF6"
//           }
//         }
//       },
//       author: {
//         data: {
//           id: 4,
//           attributes: {
//             username: "Dr. James Anderson",
//             email: "j.anderson@example.com"
//           }
//         }
//       }
//     }
//   },
//   {
//     id: 5,
//     attributes: {
//       title: "Economic Markets React to New Trade Agreement",
//       slug: "economic-markets-trade-agreement",
//       content: "Global financial markets have responded positively to the announcement of a comprehensive new trade agreement between major economic powers, with stock indices reaching record highs across multiple continents.\n\n## Market Response\n\nKey market indicators showed strong gains:\n\n- **S&P 500**: Up 3.2% in early trading\n- **NASDAQ**: Gained 4.1%, led by technology stocks\n- **European Markets**: FTSE 100 and DAX both up over 2%\n- **Asian Markets**: Nikkei and Hang Seng posted significant gains\n\n## Trade Agreement Details\n\nThe agreement includes several groundbreaking provisions:\n\n### Tariff Reductions\n- 40% reduction in manufacturing tariffs over 3 years\n- Elimination of agricultural export restrictions\n- Streamlined customs procedures\n\n### Digital Trade\n- Framework for cross-border data flows\n- Harmonized cybersecurity standards\n- Protection for digital intellectual property\n\n### Environmental Standards\n- Binding environmental compliance requirements\n- Green technology transfer provisions\n- Carbon pricing mechanisms\n\n## Economic Impact\n\nEconomists project the agreement could boost global GDP by 1.2% over the next five years and create millions of new jobs across participating nations.",
//       excerpt: "Stock markets soar as new comprehensive trade agreement promises to boost global economic growth and create millions of jobs.",
//       tags: "economy,trade,markets,business,global",
//       publishedAt: "2024-01-11T09:15:00.000Z",
//       createdAt: "2024-01-11T08:15:00.000Z",
//       updatedAt: "2024-01-11T09:15:00.000Z",
//       featuredImage: {
//         data: {
//           id: 5,
//           attributes: {
//             url: "/uploads/stock_market.jpg",
//             alternativeText: "Stock market trading floor",
//             width: 1200,
//             height: 800,
//             formats: {}
//           }
//         }
//       },
//       category: {
//         data: {
//           id: 5,
//           attributes: {
//             name: "Business",
//             slug: "business",
//             description: "Business and economic news",
//             color: "#F59E0B"
//           }
//         }
//       },
//       author: {
//         data: {
//           id: 5,
//           attributes: {
//             username: "Sarah Johnson",
//             email: "s.johnson@example.com"
//           }
//         }
//       }
//     }
//   },
//   {
//     id: 6,
//     attributes: {
//       title: "Artificial Intelligence Breakthrough in Natural Language Processing",
//       slug: "ai-breakthrough-natural-language-processing",
//       content: "Researchers have achieved a significant breakthrough in artificial intelligence, developing a new natural language processing model that demonstrates unprecedented understanding of context, nuance, and human communication patterns.\n\n## Technical Achievements\n\nThe new AI model, called ContextGPT, shows remarkable improvements:\n\n- **98% Accuracy**: In understanding contextual meaning\n- **Multilingual Support**: Fluent in 150+ languages\n- **Real-time Processing**: Instant response with complex queries\n- **Emotional Intelligence**: Recognition of tone and sentiment\n\n## Key Innovations\n\n### Advanced Context Understanding\nThe model uses a revolutionary attention mechanism that maintains context across extremely long conversations, remembering details from thousands of exchanges ago.\n\n### Cultural Sensitivity\nUnlike previous models, ContextGPT demonstrates awareness of cultural differences and adapts its responses accordingly, making it suitable for global applications.\n\n### Reasoning Capabilities\nThe system can perform complex logical reasoning, mathematical problem-solving, and creative tasks with human-level proficiency.\n\n## Applications and Impact\n\nThis breakthrough has immediate applications in:\n\n- **Education**: Personalized tutoring and learning assistance\n- **Healthcare**: Medical diagnosis support and patient interaction\n- **Customer Service**: More natural and helpful automated support\n- **Content Creation**: Assistance with writing, research, and analysis\n\nThe research team expects commercial deployment within 18 months.",
//       excerpt: "New AI model achieves 98% accuracy in natural language understanding, demonstrating human-level reasoning and emotional intelligence across 150+ languages.",
//       tags: "artificial intelligence,AI,NLP,technology,breakthrough",
//       publishedAt: "2024-01-10T12:00:00.000Z",
//       createdAt: "2024-01-10T11:00:00.000Z",
//       updatedAt: "2024-01-10T12:00:00.000Z",
//       featuredImage: {
//         data: {
//           id: 6,
//           attributes: {
//             url: "/uploads/ai_breakthrough.jpg",
//             alternativeText: "Artificial intelligence neural network visualization",
//             width: 1200,
//             height: 800,
//             formats: {}
//           }
//         }
//       },
//       category: {
//         data: {
//           id: 1,
//           attributes: {
//             name: "Technology",
//             slug: "technology",
//             description: "Latest technology news and innovations",
//             color: "#3B82F6"
//           }
//         }
//       },
//       author: {
//         data: {
//           id: 6,
//           attributes: {
//             username: "Dr. Alex Kim",
//             email: "a.kim@example.com"
//           }
//         }
//       }
//     }
//   }
// ];

// const mockCategories: StrapiCategory[] = [
//   {
//     id: 1,
//     attributes: {
//       name: "Technology",
//       slug: "technology",
//       description: "Latest technology news and innovations",
//       color: "#3B82F6",
//       publishedAt: "2024-01-01T00:00:00.000Z",
//       createdAt: "2024-01-01T00:00:00.000Z",
//       updatedAt: "2024-01-01T00:00:00.000Z"
//     }
//   },
//   {
//     id: 2,
//     attributes: {
//       name: "Environment",
//       slug: "environment",
//       description: "Environmental news and climate change coverage",
//       color: "#10B981",
//       publishedAt: "2024-01-01T00:00:00.000Z",
//       createdAt: "2024-01-01T00:00:00.000Z",
//       updatedAt: "2024-01-01T00:00:00.000Z"
//     }
//   },
//   {
//     id: 3,
//     attributes: {
//       name: "Health",
//       slug: "health",
//       description: "Health and medical news",
//       color: "#EF4444",
//       publishedAt: "2024-01-01T00:00:00.000Z",
//       createdAt: "2024-01-01T00:00:00.000Z",
//       updatedAt: "2024-01-01T00:00:00.000Z"
//     }
//   },
//   {
//     id: 4,
//     attributes: {
//       name: "Science",
//       slug: "science",
//       description: "Scientific discoveries and research",
//       color: "#8B5CF6",
//       publishedAt: "2024-01-01T00:00:00.000Z",
//       createdAt: "2024-01-01T00:00:00.000Z",
//       updatedAt: "2024-01-01T00:00:00.000Z"
//     }
//   },
//   {
//     id: 5,
//     attributes: {
//       name: "Business",
//       slug: "business",
//       description: "Business and economic news",
//       color: "#F59E0B",
//       publishedAt: "2024-01-01T00:00:00.000Z",
//       createdAt: "2024-01-01T00:00:00.000Z",
//       updatedAt: "2024-01-01T00:00:00.000Z"
//     }
//   }
// ];

class StrapiApiService {
  private baseHeaders: Record<string, string>;

  constructor() {
    const config = strapiConfig.getConfig();
    this.baseHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiToken}`,
    };
  }

  /**
   * Check if running in demo mode (when API token is not properly configured)
   */
  // private isDemoMode(): boolean {
  //   const config = strapiConfig.getConfig();
  //   return config.apiToken === 'demo-mode';
  // }

  /**
   * Generate mock response data for demo mode
   */
  private generateMockResponse<T>(
    data: T[], 
    page: number = 1, 
    pageSize: number = 10
  ): StrapiCollectionResponse<T> | StrapiSingleResponse<T> {
    if (Array.isArray(data)) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = data.slice(startIndex, endIndex);
      
      return {
        data: paginatedData,
        meta: {
          pagination: {
            page,
            pageSize,
            pageCount: Math.ceil(data.length / pageSize),
            total: data.length
          }
        }
      } as StrapiCollectionResponse<T>;
    } else {
      return {
        data: data,
        meta: {}
      } as StrapiSingleResponse<T>;
    }
  }

  /**
   * Generic fetch method with error handling
   */
  private async fetchFromStrapi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = strapiConfig.getApiUrl(endpoint);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.baseHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error: StrapiError = {
          status: response.status,
          name: errorData.error?.name || 'APIError',
          message: errorData.error?.message || `Request failed with status ${response.status}`,
          details: errorData.error?.details || {},
        };
        throw error;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error && error.name === 'TypeError') {
        const networkError: StrapiError = {
          status: 0,
          name: 'NetworkError',
          message: 'Failed to connect to Strapi API. Please check your configuration and network connection.',
          details: { originalError: error.message },
        };
        throw networkError;
      }
      throw error;
    }
  }

  /**
   * Build query string from parameters
   */
  private buildQueryString(params: StrapiQueryParams): string {
    const urlParams = new URLSearchParams();

    // Handle pagination
    if (params.pagination) {
      Object.entries(params.pagination).forEach(([key, value]) => {
        if (value !== undefined) {
          urlParams.append(`pagination[${key}]`, value.toString());
        }
      });
    }

    // Handle sort
    if (params.sort) {
      const sortArray = Array.isArray(params.sort) ? params.sort : [params.sort];
      sortArray.forEach(sort => urlParams.append('sort', sort));
    }

    // Handle fields
    if (params.fields) {
      params.fields.forEach(field => urlParams.append('fields', field));
    }

    // Handle populate
    if (params.populate) {
      if (typeof params.populate === 'string') {
        urlParams.append('populate', params.populate);
      } else if (Array.isArray(params.populate)) {
        params.populate.forEach(pop => urlParams.append('populate', pop));
      } else {
        // Handle complex populate object
        Object.entries(params.populate).forEach(([key, value]) => {
          if (typeof value === 'boolean' && value) {
            urlParams.append('populate', key);
          } else if (typeof value === 'object') {
            urlParams.append(`populate[${key}]`, JSON.stringify(value));
          }
        });
      }
    }

    // // Handle filters
    // if (params.filters) {
    //   Object.entries(params.filters).forEach(([key, value]) => {
    //     if (typeof value === 'object' && value !== null) {
    //       Object.entries(value).forEach(([operator, filterValue]) => {
    //         urlParams.append(`filters[${key}][${operator}]`, filterValue as string);
    //       });
    //     } else {
    //       urlParams.append(`filters[${key}]`, value as string);
    //     }
    //   });
    // }

    // Handle filters
if (params.filters) {
  Object.entries(params.filters).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([operator, filterValue]) => {
        // Ensure filterValue is properly converted to string
        const stringValue = typeof filterValue === 'object' 
          ? JSON.stringify(filterValue) 
          : String(filterValue);
        urlParams.append(`filters[${key}][${operator}]`, stringValue);
      });
    } else {
      urlParams.append(`filters[${key}]`, String(value));
    }
  });
}

    // Handle other parameters
    if (params.publicationState) {
      urlParams.append('publicationState', params.publicationState);
    }
    if (params.locale) {
      urlParams.append('locale', params.locale);
    }

    return urlParams.toString();
  }

  // Articles API
  async getArticles(params: StrapiQueryParams = {}): Promise<StrapiCollectionResponse<StrapiArticle>> {
    if (this.isDemoMode()) {
      let filteredArticles = [...mockArticles];
      
      // Apply category filter if specified
      if (params.filters?.category?.slug?.$eq) {
        filteredArticles = filteredArticles.filter(article => 
          article.attributes.category?.data?.attributes.slug === params.filters?.category?.slug?.$eq
        );
      }
      
      // Apply search filter (simple title/excerpt search)
      if (params.filters?.title?.$containsi || params.filters?.$or) {
        const searchTerm = params.filters?.title?.$containsi || '';
        filteredArticles = filteredArticles.filter(article => 
          article.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.attributes.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.attributes.tags?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      const page = params.pagination?.page || 1;
      const pageSize = params.pagination?.pageSize || 10;
      
      return this.generateMockResponse(filteredArticles, page, pageSize) as StrapiCollectionResponse<StrapiArticle>;
    }
    
    const queryString = this.buildQueryString({
      populate: ['featuredImage', 'category', 'author'],
      sort: ['publishedAt:desc'],
      ...params,
    });
    
    return this.fetchFromStrapi(`/articles?${queryString}`);
  }

  async getArticle(id: number, params: StrapiQueryParams = {}): Promise<StrapiSingleResponse<StrapiArticle>> {
    if (this.isDemoMode()) {
      const article = mockArticles.find(a => a.id === id);
      if (!article) {
        throw new Error(`Article with id ${id} not found`);
      }
      return { data: article, meta: {} };
    }
    
    const queryString = this.buildQueryString({
      populate: ['featuredImage', 'category', 'author'],
      ...params,
    });
    
    return this.fetchFromStrapi(`/articles/${id}?${queryString}`);
  }

  async getArticleBySlug(slug: string, params: StrapiQueryParams = {}): Promise<StrapiCollectionResponse<StrapiArticle>> {
    if (this.isDemoMode()) {
      const article = mockArticles.find(a => a.attributes.slug === slug);
      if (!article) {
        return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } } };
      }
      return { data: [article], meta: { pagination: { page: 1, pageSize: 1, pageCount: 1, total: 1 } } };
    }
    
    const queryString = this.buildQueryString({
      filters: { slug: { $eq: slug } },
      populate: ['featuredImage', 'category', 'author'],
      ...params,
    });
    
    return this.fetchFromStrapi(`/articles?${queryString}`);
  }

  async getFeaturedArticles(limit: number = 6): Promise<StrapiCollectionResponse<StrapiArticle>> {
    return this.getArticles({
      populate: ['featuredImage', 'category', 'author'],
      sort: ['publishedAt:desc'],
      pagination: { pageSize: limit },
    });
  }

  async getArticlesByCategory(categorySlug: string, params: StrapiQueryParams = {}): Promise<StrapiCollectionResponse<StrapiArticle>> {
    return this.getArticles({
      filters: { 
        category: { 
          slug: { $eq: categorySlug } 
        } 
      },
      ...params,
    });
  }

  // Categories API
  async getCategories(params: StrapiQueryParams = {}): Promise<StrapiCollectionResponse<StrapiCategory>> {
    if (this.isDemoMode()) {
      const page = params.pagination?.page || 1;
      const pageSize = params.pagination?.pageSize || 10;
      return this.generateMockResponse(mockCategories, page, pageSize) as StrapiCollectionResponse<StrapiCategory>;
    }
    
    const queryString = this.buildQueryString({
      sort: ['name:asc'],
      ...params,
    });
    
    return this.fetchFromStrapi(`/categories?${queryString}`);
  }

  async getCategory(id: number): Promise<StrapiSingleResponse<StrapiCategory>> {
    if (this.isDemoMode()) {
      const category = mockCategories.find(c => c.id === id);
      if (!category) {
        throw new Error(`Category with id ${id} not found`);
      }
      return { data: category, meta: {} };
    }
    
    return this.fetchFromStrapi(`/categories/${id}`);
  }

  async getCategoryBySlug(slug: string): Promise<StrapiCollectionResponse<StrapiCategory>> {
    if (this.isDemoMode()) {
      const category = mockCategories.find(c => c.attributes.slug === slug);
      if (!category) {
        return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } } };
      }
      return { data: [category], meta: { pagination: { page: 1, pageSize: 1, pageCount: 1, total: 1 } } };
    }
    
    const queryString = this.buildQueryString({
      filters: { slug: { $eq: slug } },
    });
    
    return this.fetchFromStrapi(`/categories?${queryString}`);
  }

  // Transform methods (convert Strapi responses to frontend-friendly format)
  transformArticle(strapiArticle: StrapiArticle): Article {
    const { id, attributes } = strapiArticle;
    
    return {
      id,
      title: attributes.title,
      slug: attributes.slug,
      content: attributes.content,
      excerpt: attributes.excerpt || '',
      tags: attributes.tags ? attributes.tags.split(',').map(tag => tag.trim()) : [],
      featuredImage: attributes.featuredImage?.data ? {
        id: attributes.featuredImage.data.id,
        url: this.isDemoMode() ? this.getDemoImageUrl(attributes.featuredImage.data.id) : strapiConfig.getUploadUrl(attributes.featuredImage.data.attributes.url),
        alternativeText: attributes.featuredImage.data.attributes.alternativeText || '',
        width: attributes.featuredImage.data.attributes.width,
        height: attributes.featuredImage.data.attributes.height,
        formats: Object.values(attributes.featuredImage.data.attributes.formats || {}),
      } : null,
      category: attributes.category?.data ? {
        id: attributes.category.data.id,
        name: attributes.category.data.attributes.name,
        slug: attributes.category.data.attributes.slug,
        description: attributes.category.data.attributes.description || '',
        color: attributes.category.data.attributes.color || '',
      } : null,
      author: attributes.author?.data ? {
        id: attributes.author.data.id,
        username: attributes.author.data.attributes.username,
        email: attributes.author.data.attributes.email,
      } : null,
      publishedAt: attributes.publishedAt,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    };
  }

  transformCategory(strapiCategory: StrapiCategory): Category {
    const { id, attributes } = strapiCategory;
    
    return {
      id,
      name: attributes.name,
      slug: attributes.slug,
      description: attributes.description || '',
      color: attributes.color || '',
      publishedAt: attributes.publishedAt,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    };
  }
}

export const strapiApi = new StrapiApiService();
export default strapiApi;