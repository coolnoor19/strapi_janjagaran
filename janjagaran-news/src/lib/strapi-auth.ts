/**
 * Strapi Authentication Utilities
 * 
 * This module provides authentication utilities for Strapi admin access.
 * Note: This is for admin authentication, not frontend user authentication.
 * 
 * AUTHENTICATION SETUP:
 * 
 * 1. ADMIN AUTHENTICATION (for content management):
 *    - Access your Strapi admin panel (Cloud: your-project-url/admin, Self-hosted: localhost:1337/admin)
 *    - Create admin user account
 *    - Generate API tokens in Settings > API Tokens
 *    - Use "Full access" or custom permissions based on your needs
 * 
 * 2. USER AUTHENTICATION (for frontend users - if needed):
 *    - Enable Users & Permissions plugin (usually enabled by default)
 *    - Configure roles and permissions in Settings > Users & Permissions Plugin
 *    - Set up registration/login endpoints
 *    - This module can be extended for frontend user auth if needed
 */

import strapiConfig from './strapi-config';
import { StrapiError } from '@/types/strapi';

interface AdminLoginCredentials {
  identifier: string; // email or username
  password: string;
}

interface AdminAuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    preferedLanguage: string;
  };
}

interface ApiTokenInfo {
  id: number;
  name: string;
  description: string;
  accessKey: string;
  lastUsedAt: string;
  permissions: string[];
  expiresAt: string | null;
  lifespan: number | null;
  createdAt: string;
  updatedAt: string;
}

class StrapiAuthService {
  private adminToken: string | null = null;

  /**
   * Admin login (for programmatic admin access)
   * Note: This is typically not used in production frontend apps
   */
  async adminLogin(credentials: AdminLoginCredentials): Promise<AdminAuthResponse> {
    const config = strapiConfig.getConfig();
    
    try {
      const response = await fetch(`${config.baseUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new StrapiError({
          status: response.status,
          name: 'AuthenticationError',
          message: errorData.message || 'Admin login failed',
          details: errorData,
        });
      }

      const authData: AdminAuthResponse = await response.json();
      this.adminToken = authData.jwt;
      
      return authData;
    } catch (error) {
      if (error instanceof Error && error.name === 'TypeError') {
        throw new StrapiError({
          status: 0,
          name: 'NetworkError',
          message: 'Failed to connect to Strapi for authentication',
          details: { originalError: error.message },
        });
      }
      throw error;
    }
  }

  /**
   * Get current admin token
   */
  getAdminToken(): string | null {
    return this.adminToken;
  }

  /**
   * Set admin token manually
   */
  setAdminToken(token: string): void {
    this.adminToken = token;
  }

  /**
   * Clear admin token (logout)
   */
  clearAdminToken(): void {
    this.adminToken = null;
  }

  /**
   * Validate API token (test if current token works)
   */
  async validateApiToken(): Promise<boolean> {
    const config = strapiConfig.getConfig();
    
    try {
      const response = await fetch(strapiConfig.getApiUrl('/articles?pagination[pageSize]=1'), {
        headers: {
          'Authorization': `Bearer ${config.apiToken}`,
        },
      });

      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get API token information (requires admin access)
   */
  async getApiTokenInfo(): Promise<ApiTokenInfo[]> {
    const config = strapiConfig.getConfig();
    
    if (!this.adminToken) {
      throw new StrapiError({
        status: 401,
        name: 'AuthenticationError',
        message: 'Admin authentication required',
        details: {},
      });
    }

    try {
      const response = await fetch(`${config.baseUrl}/admin/api-tokens`, {
        headers: {
          'Authorization': `Bearer ${this.adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new StrapiError({
          status: response.status,
          name: 'APIError',
          message: 'Failed to fetch API token information',
          details: {},
        });
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      if (error instanceof StrapiError) {
        throw error;
      }
      throw new StrapiError({
        status: 0,
        name: 'NetworkError',
        message: 'Failed to connect to Strapi admin API',
        details: { originalError: error },
      });
    }
  }

  /**
   * Test Strapi connection and configuration
   */
  async testConnection(): Promise<{
    success: boolean;
    message: string;
    details: {
      deploymentType: string;
      baseUrl: string;
      apiTokenValid: boolean;
      adminAccessible: boolean;
    };
  }> {
    const config = strapiConfig.getConfig();
    const details = {
      deploymentType: config.deploymentType,
      baseUrl: config.baseUrl,
      apiTokenValid: false,
      adminAccessible: false,
    };

    try {
      // Test API token
      details.apiTokenValid = await this.validateApiToken();
      
      // Test admin panel accessibility
      try {
        const adminResponse = await fetch(`${config.baseUrl}/admin`, { method: 'HEAD' });
        details.adminAccessible = adminResponse.ok;
      } catch {
        details.adminAccessible = false;
      }

      if (details.apiTokenValid) {
        return {
          success: true,
          message: 'Strapi connection successful',
          details,
        };
      } else {
        return {
          success: false,
          message: 'Strapi API token is invalid or insufficient permissions',
          details,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof StrapiError ? error.message : 'Failed to connect to Strapi',
        details,
      };
    }
  }
}

export const strapiAuth = new StrapiAuthService();
export default strapiAuth;

// Utility function to check if Strapi is properly configured
export async function checkStrapiSetup(): Promise<void> {
  const testResult = await strapiAuth.testConnection();
  
  if (!testResult.success) {
    console.error('Strapi Setup Error:', testResult.message);
    console.log('Configuration Details:', testResult.details);
    
    // Provide helpful setup instructions
    const config = strapiConfig.getConfig();
    if (config.deploymentType === 'cloud') {
      console.log(`
🔧 Strapi Cloud Setup Instructions:
1. Visit https://strapi.io/cloud and create a project
2. Get your project URL from the dashboard
3. Generate an API token in Settings > API Tokens
4. Update your environment variables:
   - VITE_STRAPI_CLOUD_URL=${config.baseUrl}
   - VITE_STRAPI_CLOUD_API_TOKEN=your-actual-token
      `);
    } else {
      console.log(`
🔧 Self-hosted Strapi Setup Instructions:
1. Install Strapi: npx create-strapi-app@latest my-project
2. Start Strapi: cd my-project && npm run develop
3. Access admin panel: http://localhost:1337/admin
4. Create admin user and generate API token
5. Update your environment variables:
   - VITE_STRAPI_SELF_HOSTED_URL=${config.baseUrl}
   - VITE_STRAPI_SELF_HOSTED_API_TOKEN=your-actual-token
      `);
    }
  }
}