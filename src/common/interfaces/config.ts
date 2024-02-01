export interface IConfig {
  env: string;
  databaseUrl: string;
  oauth: {
    google: {
      clientId: string;
    };
  };
}
