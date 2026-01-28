
export type Service = 'wanikani' | 'bunpro' | 'jisho';

export type ServiceConfig = {
  [K in Service]: {
    baseUrl: string;
    apiKey?: string;
    apiVersion?: string;
  };
};

let config: ServiceConfig;
try {
  config = validateConfig();
} catch (error) {
  console.error('Configuration Error:', (error as Error).message);
  process.exit(1);
}

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
    jisho: {
      baseUrl: 'https://jisho.org',
    },
  };
}

function getRequiredProperty(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
      `Please add it to your .env.local file.`
    );
  }
  return value;
}

export { config };