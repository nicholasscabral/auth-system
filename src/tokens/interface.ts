import { TokenExpiryByType } from 'src/common/enums';
import { TokenPayload } from 'src/common/interfaces/token';

export interface ITokenService {
  generate(payload: any, expiresIn: TokenExpiryByType): string;
  decode?(token: string): any;
  verify?(token: string): any;
  validate?(token: string): Promise<TokenPayload>;
}

export interface IAccessTokenService extends ITokenService {}

export interface IRefreshTokenService extends ITokenService {
  upsert(token: string, userId: number): Promise<any>;
}

export interface IAccountVerificationTokenService extends ITokenService {}

export interface IResetPasswordTokenService extends ITokenService {}
