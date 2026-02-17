
export type Service = 'wanikani' | 'bunpro' | 'translate';

export type ServiceConfig = {
  [K in Service]: {
    baseUrl: string;
    apiKey?: string;
    apiVersion?: string;
  };
};
 
let config: ServiceConfig | null = null;

function validateConfig(): ServiceConfig {
  return {
    wanikani: {
      baseUrl: 'https://api.wanikani.com/v2',
      apiVersion: '20170710',
      apiKey: getRequiredProperty('WANIKANI_API_KEY'),
    },
    bunpro: {
      baseUrl: 'https://api.bunpro.jp/api/frontend',
      apiKey: getRequiredProperty('BUNPRO_API_KEY'),
    },
    translate: {
      baseUrl: 'http://0.0.0.0:5000',
    },
  };
}

function getRequiredProperty(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
      'Pass it with the -e flag when running the Docker container.'
    );
  }
  return value;
}

// return a singleton config object, validating it on first access
export function getConfig(): ServiceConfig {
  if (!config) {
    config = validateConfig();
  }

  return config;
}