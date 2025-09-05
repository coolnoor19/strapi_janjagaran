/**
 * Strapi Configuration System
 * 
 * This configuration system supports both Strapi Cloud and self-hosted deployments.
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. STRAPI CLOUD SETUP:
 *    - Create account at https://strapi.io/cloud
 *    - Create new project
 *    - Get your API URL from project dashboard
 *    - Generate API token in Settings > API Tokens
 *    - Set VITE_STRAPI_DEPLOYMENT_TYPE=cloud
 *    - Set VITE_STRAPI_CLOUD_URL and VITE_STRAPI_CLOUD_API_TOKEN
 * 
 * 2. SELF-HOSTED SETUP:
 *    - Install Strapi locally: npx create-strapi-app@latest my-project
 *    - Start Strapi: npm run develop (usually runs on http://localhost:1337)
 *    - Create admin user in admin panel
 *    - Generate API token in Settings > API Tokens
 *    - Set VITE_STRAPI_DEPLOYMENT_TYPE=self-hosted  
 *    - Set VITE_STRAPI_SELF_HOSTED_URL and VITE_STRAPI_SELF_HOSTED_API_TOKEN
 */

export type StrapiDeploymentType = 'cloud' | 'self-hosted';

export interface StrapiConfig {
  deploymentType: StrapiDeploymentType;
  baseUrl: string;
  apiToken: string;
  apiVersion: string;
  uploadFolder: string;
  apiUrl: string;
  uploadUrl: string;
}

class StrapiConfigManager {
  private config: StrapiConfig;

  constructor() {
    this.config = this.initializeConfig();
  }

  private initializeConfig(): StrapiConfig {
    const deploymentType = this.getEnvVar('VITE_STRAPI_DEPLOYMENT_TYPE', 'self-hosted') as StrapiDeploymentType;
    const apiVersion = this.getEnvVar('VITE_STRAPI_API_VERSION', 'api');
    const uploadFolder = this.getEnvVar('VITE_STRAPI_UPLOAD_FOLDER', 'uploads');

    let baseUrl: string;
    let apiToken: string;

    if (deploymentType === 'cloud') {
      baseUrl = this.getEnvVar('VITE_STRAPI_CLOUD_URL');
      apiToken = this.getEnvVar('VITE_STRAPI_CLOUD_API_TOKEN');
    } else {
      baseUrl = this.getEnvVar('VITE_STRAPI_SELF_HOSTED_URL', 'http://localhost:1337');
      apiToken = this.getEnvVar('VITE_STRAPI_SELF_HOSTED_API_TOKEN');
    }

    if (!baseUrl || !apiToken || apiToken === 'your-actual-token-here') {
      console.warn(`Missing required Strapi configuration for ${deploymentType} deployment. Running in demo mode with mock data.`);
      // Set fallback values for demo mode
      baseUrl = baseUrl || 'http://localhost:1337';
      apiToken = 'demo-mode';
    }

    const apiUrl = `${baseUrl}/${apiVersion}`;
    const uploadUrl = `${baseUrl}/${uploadFolder}`;

    return {
      deploymentType,
      baseUrl,
      apiToken,
      apiVersion,
      uploadFolder,
      apiUrl,
      uploadUrl,
    };
  }

  private getEnvVar(name: string, defaultValue?: string): string {
    const value = import.meta.env[name] || defaultValue;
    if (!value && !defaultValue) {
      console.warn(`Environment variable ${name} is not configured. Using fallback for development.`);
      return '';
    }
    return value || '';
  }

  public getConfig(): StrapiConfig {
    return { ...this.config };
  }

  public getApiUrl(endpoint: string): string {
    return `${this.config.apiUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  }

  public getUploadUrl(path: string): string {
    if (!path) return '';
    // Handle both relative and absolute paths
    if (path.startsWith('http')) return path;
    return `${this.config.uploadUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }

  public isCloud(): boolean {
    return this.config.deploymentType === 'cloud';
  }

  public isSelfHosted(): boolean {
    return this.config.deploymentType === 'self-hosted';
  }
}

export const strapiConfig = new StrapiConfigManager();
export default strapiConfig;