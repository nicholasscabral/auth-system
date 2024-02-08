export interface IConfig {
  env: string;
  databaseUrl: string;
  jwtSecret: string;
  verifyEmailRedirectUrl: string;
  oauth: {
    google: {
      clientId: string;
    };
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
