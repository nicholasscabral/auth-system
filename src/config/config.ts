import { IConfig } from 'src/common/interfaces/config';

export const config: IConfig = {
  env: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
    },
  },
};
