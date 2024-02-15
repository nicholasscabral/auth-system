export type GoogleOAuthUser = {
  email: string;
  name: string;
  picture: string;
  sub: string;
  accessToken: string;
};

export type GithubOAuthUser = {
  name: string;
  accessToken: string;
};
