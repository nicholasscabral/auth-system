import { User } from '../entities';

export type GoogleOAuthUser = {
  sub: string;
  email: string;
  name: string;
  picture: string;
  accessToken: string;
};

export type GithubOAuthUser = {
  sub: string;
  name: string;
  email: string;
  accessToken: string;
};

export type MicrosoftOAuthUser = {
  sub: string;
  name: string;
  email: string;
  accessToken: string;
};

export type OAuthUser = GithubOAuthUser | MicrosoftOAuthUser | GithubOAuthUser;

export type LoggedUser = User | OAuthUser;
