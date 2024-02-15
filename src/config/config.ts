import { IConfig } from 'src/common/interfaces/config';

export const config: IConfig = {
  env: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  verifyEmailRedirectUrl: process.env.VERIFY_EMAIL_REDIRECT_URL,
  oauth: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope: ['email', 'profile'],
    },
    github: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK,
      scope: ['user:email', 'emails:read'],
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
