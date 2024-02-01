declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      DATABASE_URL: string;
      GOOGLE_CLIENT_ID: string;
    }
  }
}

export {};
