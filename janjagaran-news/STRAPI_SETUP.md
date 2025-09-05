# Strapi Backend Integration Setup

This document provides comprehensive instructions for setting up Strapi backend integration with support for both Strapi Cloud and self-hosted deployments.

## Quick Start

1. **Copy environment variables:**
   ```bash
   cp .env.example .env.local
   ```

2. **Choose your deployment type and configure:**
   - For Strapi Cloud: Set `VITE_STRAPI_DEPLOYMENT_TYPE=cloud`
   - For self-hosted: Set `VITE_STRAPI_DEPLOYMENT_TYPE=self-hosted`

3. **Update the corresponding environment variables** (see detailed instructions below)

4. **Create content types in Strapi admin panel** (see Content Types section)

5. **Test the connection** using the included utilities

## Environment Variables

### Strapi Cloud Configuration

```env
VITE_STRAPI_DEPLOYMENT_TYPE=cloud
VITE_STRAPI_CLOUD_URL=https://your-project-name.strapiapp.com
VITE_STRAPI_CLOUD_API_TOKEN=your-cloud-api-token
VITE_STRAPI_API_VERSION=api
VITE_STRAPI_UPLOAD_FOLDER=uploads
```

### Self-hosted Configuration

```env
VITE_STRAPI_DEPLOYMENT_TYPE=self-hosted
VITE_STRAPI_SELF_HOSTED_URL=http://localhost:1337
VITE_STRAPI_SELF_HOSTED_API_TOKEN=your-self-hosted-api-token
VITE_STRAPI_API_VERSION=api
VITE_STRAPI_UPLOAD_FOLDER=uploads
```

## Strapi Cloud Setup

1. **Create Strapi Cloud Account:**
   - Visit [https://strapi.io/cloud](https://strapi.io/cloud)
   - Sign up for an account
   - Create a new project

2. **Get Project URL:**
   - Access your project dashboard
   - Copy the project URL (e.g., `https://your-project-name.strapiapp.com`)

3. **Generate API Token:**
   - Access your Strapi admin panel
   - Go to Settings > API Tokens
   - Click "Create new API Token"
   - Choose "Full access" or configure custom permissions
   - Copy the generated token

4. **Update Environment Variables:**
   ```env
   VITE_STRAPI_DEPLOYMENT_TYPE=cloud
   VITE_STRAPI_CLOUD_URL=https://your-actual-project-url.strapiapp.com
   VITE_STRAPI_CLOUD_API_TOKEN=your-actual-api-token
   ```

## Self-hosted Setup

1. **Install Strapi:**
   ```bash
   npx create-strapi-app@latest my-strapi-backend
   cd my-strapi-backend
   ```

2. **Start Development Server:**
   ```bash
   npm run develop
   ```
   Strapi will start on `http://localhost:1337`

3. **Create Admin User:**
   - Visit `http://localhost:1337/admin`
   - Create your admin account

4. **Generate API Token:**
   - In admin panel, go to Settings > API Tokens
   - Click "Create new API Token"
   - Choose "Full access" or configure permissions
   - Copy the generated token

5. **Update Environment Variables:**
   ```env
   VITE_STRAPI_DEPLOYMENT_TYPE=self-hosted
   VITE_STRAPI_SELF_HOSTED_URL=http://localhost:1337
   VITE_STRAPI_SELF_HOSTED_API_TOKEN=your-actual-api-token
   ```

## Content Types Setup

Create these content types in your Strapi admin panel:

### 1. Article Content Type

**Collection Type Name:** `article`

**Fields:**
- `title` - Text (Short text, Required)
- `slug` - UID (Target field: title, Required)
- `content` - Rich text (Required)
- `excerpt` - Text (Long text, Optional)
- `category` - Relation (Many to One with Category)
- `featuredImage` - Media (Single media, Optional)
- `publishedAt` - Date (Date & time, Optional)
- `author` - Relation (Many to One with User)
- `tags` - Text (Optional, for comma-separated tags)

### 2. Category Content Type

**Collection Type Name:** `category`

**Fields:**
- `name` - Text (Short text, Required)
- `slug` - UID (Target field: name, Required)
- `description` - Text (Long text, Optional)
- `color` - Text (Short text, Optional, for UI theming)

### 3. Permissions Setup

**Public Role Permissions:**
- article: find, findOne
- category: find, findOne

**Steps:**
1. Go to Settings > Users & Permissions Plugin > Roles
2. Click on "Public"
3. Expand "Article" and check: find, findOne
4. Expand "Category" and check: find, findOne
5. Save

## Usage Examples

### Fetching Articles

```typescript
import { useFeaturedArticles, useArticlesByCategory } from '@/hooks/use-strapi';

// Get featured articles
function FeaturedSection() {
  const { data: articles, isLoading, error } = useFeaturedArticles(6);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {articles?.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

// Get articles by category
function CategoryPage({ categorySlug }: { categorySlug: string }) {
  const { data: articles } = useArticlesByCategory(categorySlug);
  
  return (
    <div>
      {articles?.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
```

### Fetching Categories

```typescript
import { useCategories } from '@/hooks/use-strapi';

function CategoryNavigation() {
  const { data: categories, isLoading } = useCategories();
  
  if (isLoading) return <div>Loading categories...</div>;
  
  return (
    <nav>
      {categories?.map(category => (
        <Link key={category.id} to={`/category/${category.slug}`}>
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
```

## Testing Connection

Add this to your component to test Strapi connection:

```typescript
import { checkStrapiSetup } from '@/lib/strapi-auth';

// Test connection on component mount
useEffect(() => {
  checkStrapiSetup().then(() => {
    console.log('Strapi connection tested - check console for results');
  });
}, []);
```

## Troubleshooting

### Common Issues

1. **"Failed to connect to Strapi API"**
   - Check if your Strapi server is running
   - Verify the BASE_URL in environment variables
   - Check network connectivity

2. **"Invalid API token"**
   - Regenerate API token in Strapi admin
   - Ensure token has proper permissions
   - Check environment variable name and value

3. **"Content type not found"**
   - Create the required content types in Strapi admin
   - Check content type names match exactly
   - Ensure content types are published

4. **"Permission denied"**
   - Check public permissions for content types
   - Verify API token permissions
   - Check role-based access control

### Environment-specific Troubleshooting

**Strapi Cloud:**
- Ensure project is deployed and accessible
- Check project URL format (should include .strapiapp.com)
- Verify billing status if on paid plan

**Self-hosted:**
- Ensure Strapi development server is running
- Check port and host configuration
- Verify database connection

## Production Deployment

### Frontend Deployment
Update environment variables for production:
```env
VITE_STRAPI_DEPLOYMENT_TYPE=cloud
VITE_STRAPI_CLOUD_URL=https://your-production-strapi.strapiapp.com
VITE_STRAPI_CLOUD_API_TOKEN=your-production-api-token
```

### Self-hosted Production
For self-hosted production deployment:
1. Deploy Strapi to your server (PM2, Docker, etc.)
2. Use production database (PostgreSQL, MySQL, etc.)
3. Configure environment variables for production URLs
4. Set up proper security (HTTPS, CORS, etc.)

## Security Considerations

1. **API Tokens:**
   - Use minimum required permissions
   - Rotate tokens regularly
   - Never expose tokens in client-side code (environment variables are fine for Vite apps)

2. **CORS Configuration:**
   - Configure proper CORS settings in Strapi
   - Whitelist your frontend domains

3. **Rate Limiting:**
   - Implement rate limiting in production
   - Consider using CDN for media files

4. **Database Security:**
   - Use secure database credentials
   - Enable SSL for database connections in production
   - Regular database backups

## Additional Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi Cloud Documentation](https://docs.strapi.io/cloud/intro)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript with Strapi](https://docs.strapi.io/dev-docs/typescript)