type OAuthStrategyOptions = {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope: string[];
};

interface GoogleOAuthStrategyOptions extends OAuthStrategyOptions {}
interface GithubOAuthStrategyOptions extends OAuthStrategyOptions {}

export interface IConfig {
  env: string;
  databaseUrl: string;
  jwtSecret: string;
  verifyEmailRedirectUrl: string;
  oauth: {
    google: GoogleOAuthStrategyOptions;
    github: GithubOAuthStrategyOptions;
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
