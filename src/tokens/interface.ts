import { TokenExpiryByType } from 'src/common/enums';

export interface ITokenService {
  generate(payload: any, expiresIn: TokenExpiryByType): string;
  decode?(token: string): any;
  verify?(token: string): any;
  validate?(token: string): Promise<boolean>;
}

export interface IAccessTokenService extends ITokenService {}

export interface IRefreshTokenService extends ITokenService {
  upsert(token: string, userId: number): Promise<any>;
}

export interface IVerificationEmailTokenService extends ITokenService {}

export interface IResetPasswordTokenService extends ITokenService {}
