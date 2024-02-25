import { IConfig } from 'src/common/interfaces/config';

export const config: IConfig = {
  env: process.env.NODE_ENV,
  clientUrl: process.env.CLIENT_URL,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
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
    microsoft: {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: process.env.MICROSOFT_CALLBACK,
      scope: ['user.read'],
    },
  },
  mailer: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    ignoreTLS: true,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  },
  callbacks: {
    resetPassword: process.env.RESET_PASSWORD_CALLBACK_URL,
    accountVerification: process.env.ACCOUNT_VERIFICATION_CALLBACK_URL,
  },
  clientRedirects: {
    resetPassword: process.env.RESET_PASSWORD_CLIENT_REDIRECT_URL,
    accountVerification: process.env.ACCOUNT_VERIFICATION_CLIENT_REDIRECT_URL,
  },
};
