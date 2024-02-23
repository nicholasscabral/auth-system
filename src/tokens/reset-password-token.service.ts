import { Injectable } from '@nestjs/common';
import { IResetPasswordTokenService } from './interface';
import { PrismaService } from 'src/providers/database/prisma.service';
import { TokenPayload } from 'src/common/interfaces/token';
import { TokenService } from './token.service';
import { TokenExpiryByType } from 'src/common/enums';
import { ResetPasswordToken } from 'src/common/entities';

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

  async validate(token: string): Promise<boolean> {
    const resetPasswordToken: ResetPasswordToken =
      (await this.prisma.resetPasswordTokens.findFirst({
        where: { token },
      })) as ResetPasswordToken;

    if (!resetPasswordToken) return false;

    const isValid: TokenPayload = this.tokenService.verify(token);

    return !!isValid;
  }
}
