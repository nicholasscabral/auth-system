import {
  GoogleOAuthStrategyOptions,
  GithubOAuthStrategyOptions,
  MicrosoftOAuthStrategyOptions,
} from './oauth';

export interface IConfig {
  clientUrl: string;
  env: string;
  databaseUrl: string;
  jwtSecret: string;
  callbacks: {
    resetPassword: string;
    accountVerification: string;
  };
  clientRedirects: {
    resetPassword: string;
    accountVerification: string;
  };
  oauth: {
    google: GoogleOAuthStrategyOptions;
    github: GithubOAuthStrategyOptions;
    microsoft: MicrosoftOAuthStrategyOptions;
  };
  mailer: {
    service: string;
    host: string;
    secure?: boolean;
    ignoreTLS?: boolean;
    port?: number;
    auth: {
      user: string;
      pass: string;
    };
  };
}
