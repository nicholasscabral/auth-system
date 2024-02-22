export interface TokenPayload {
  sub: number;
  email: string;
  exp?: number;
  iat?: number;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
