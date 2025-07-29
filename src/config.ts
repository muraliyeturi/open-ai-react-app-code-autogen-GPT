/**
 * Application configuration
 */

interface Config {
  API_BASE_URL: string;
}

/**
 * Get application configuration
 * Safely handles environment variables and provides fallbacks
 */
export const getConfig = (): Config => {
  // In production, this could be set via build-time environment variables
  // For now, using localhost for development
  const apiBaseUrl = 'http://localhost:4000';
  
  return {
    API_BASE_URL: apiBaseUrl,
  };
};

export default getConfig();