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
  accountVerificationCallbackUrl: string;
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
