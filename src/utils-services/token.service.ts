// token.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config/config';
import { ITokenService } from './interfaces';
import { TokenExpiryByType } from 'src/common/enums';
import { PrismaService } from 'src/providers/database/prisma.service';

@Injectable()
export class TokenService extends ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  generateAccessToken(payload: { email: string }): string {
    return this.generateToken(payload, TokenExpiryByType.ACCESS_TOKEN);
  }

  generateRefreshToken(payload: { email: string }): string {
    return this.generateToken(payload, TokenExpiryByType.REFRESH_TOKEN);
  }

  generateVerificationEmailToken(payload: { email: string }): string {
    return this.generateToken(payload, TokenExpiryByType.VERIFICATION_EMAIL);
  }

  protected generateToken(payload: any, expiresIn: TokenExpiryByType): string {
    return this.jwtService.sign(payload, {
      expiresIn,
      secret: config.jwtSecret,
    });
  }

  decode(token: string): any {
    return this.jwtService.decode(token);
  }

  verifyToken(token: string, ignoreExpiration?: boolean): any {
    try {
      const decodedPayload = this.jwtService.verify(token, {
        secret: config.jwtSecret,
        ignoreExpiration: true,
      });
      const isTokenExpired = decodedPayload.exp < Math.floor(Date.now() / 1000);

      return isTokenExpired && !ignoreExpiration ? null : decodedPayload;
    } catch (e) {
      return null;
    }
  }
}
