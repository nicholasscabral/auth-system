import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { RefreshToken } from 'src/common/entities';
import { TokenExpiryByType } from 'src/common/enums';
import { TokenPayload } from 'src/common/interfaces/token';
import { PrismaService } from 'src/providers/database/prisma.service';
import { TokenService } from './token.service';
import { IRefreshTokenService } from './interface';

@Injectable()
export class RefreshTokenService implements IRefreshTokenService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prisma: PrismaService,
  ) {}

  generate(payload: TokenPayload): string {
    return this.tokenService.generate(payload, TokenExpiryByType.REFRESH_TOKEN);
  }

  async upsert(token: string, userId: number): Promise<any> {
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

  async validate(token: string): Promise<TokenPayload> {
    const refreshToken: RefreshToken =
      (await this.prisma.refreshTokens.findFirst({
        where: { token },
      })) as RefreshToken;

    if (!refreshToken) return null;

    const verifiedToken: TokenPayload = this.tokenService.verify(
      refreshToken.token,
    );

    return verifiedToken;
  }
}
