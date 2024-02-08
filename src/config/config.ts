import { IConfig } from 'src/common/interfaces/config';

export const config: IConfig = {
  env: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  verifyEmailRedirectUrl: process.env.VERIFY_EMAIL_REDIRECT_URL,
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
    },
  },
  mailer: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    ignoreTLS: true,
    auth: {
      user: process.env.MAIALER_USER,
      pass: process.env.MAIALER_PASS,
    },
  },
};
