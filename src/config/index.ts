import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export const globalConfig = {
  port: 8000,
  database: {
    type: '',
    url: '',
    database: null,
  },
};

export function loadConfig() {
  const env = dotenv.config({
    path: process.env.ENV ? process.env.ENV : '.env',
  });
  dotenvExpand(env);
  // if (!process.env.DB_URL) {
  //   throw new Error('Env var DB_URL not set');
  // }

  globalConfig.port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
  globalConfig.database = {
    type: process.env.DB_TYPE || (process.env.DB_URL || '').split(':')[0],
    url: process.env.DB_URL,
    database: process.env.DB,
  };
}
