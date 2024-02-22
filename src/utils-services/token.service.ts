// token.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config/config';
import { ITokenService } from './interfaces';
import { TokenExpiryByType } from 'src/common/enums';
import { PrismaService } from 'src/providers/database/prisma.service';
import { TokenPayload } from 'src/common/interfaces/token';
import * as dayjs from 'dayjs';
import { RefreshToken } from 'src/common/entities';
@Injectable()
export class TokenService extends ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  generateAccessToken(payload: TokenPayload): string {
    return this.generateToken(payload, TokenExpiryByType.ACCESS_TOKEN);
  }

  generateRefreshToken(payload: TokenPayload): string {
    return this.generateToken(payload, TokenExpiryByType.REFRESH_TOKEN);
  }

  generateVerificationEmailToken(payload: TokenPayload): string {
    return this.generateToken(payload, TokenExpiryByType.VERIFICATION_EMAIL);
  }

  protected generateToken(
    payload: TokenPayload,
    expiresIn: TokenExpiryByType,
  ): string {
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

  async upsertRefreshToken(token: string, userId: number): Promise<any> {
    const upsert = {
      token,
      userId,
      expiresAt: dayjs().add(7, 'day').toISOString(),
    };
    await this.prisma.refreshTokens.upsert({
      create: upsert,
      update: upsert,
      where: { userId },
    });
  }

  async validateRefreshToken(token: string): Promise<boolean> {
    const refreshToken: RefreshToken =
      (await this.prisma.refreshTokens.findFirst({
        where: { token },
      })) as RefreshToken;

    if (!refreshToken) return false;

    const isValid: TokenPayload = this.verifyToken(refreshToken.token);

    return !!isValid;
  }
}
