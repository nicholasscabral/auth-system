import { Injectable } from '@nestjs/common';
import { IResetPasswordTokenService } from './interface';
import { PrismaService } from 'src/providers/database/prisma.service';
import { TokenPayload } from 'src/common/interfaces/token';
import { TokenService } from './token.service';
import { TokenExpiryByType } from 'src/common/enums';
import { ResetPasswordToken } from 'src/common/entities';
import * as dayjs from 'dayjs';

@Injectable()
export class ResetPasswordTokenService implements IResetPasswordTokenService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prisma: PrismaService,
  ) {}

  generate(payload: TokenPayload): string {
    return this.tokenService.generate(
      payload,
      TokenExpiryByType.RESET_PASSWORD,
    );
  }

  async upsert(token: string, userId: number): Promise<any> {
    const upsert = {
      userId,
      token,
      expiresAt: dayjs().add(15, 'minute').toISOString(),
    };
    return this.prisma.resetPasswordTokens.upsert({
      create: upsert,
      update: upsert,
      where: { userId },
    });
  }

  async delete(email: string): Promise<void> {
    await this.prisma.resetPasswordTokens.deleteMany({
      where: { user: { email } },
    });
  }

  async validate(token: string): Promise<TokenPayload> {
    const resetPasswordToken: ResetPasswordToken =
      (await this.prisma.resetPasswordTokens.findFirst({
        where: { token },
      })) as ResetPasswordToken;

    if (!resetPasswordToken) return null;

    const verifiedToken: TokenPayload = this.tokenService.verify(token);

    return verifiedToken;
  }
}
