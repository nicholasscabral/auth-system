declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
    }
  }
}

export {};
