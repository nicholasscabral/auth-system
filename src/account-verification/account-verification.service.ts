import { ForbiddenException, Injectable } from '@nestjs/common';
import { config } from 'src/config/config';
import { PrismaService } from 'src/providers/database/prisma.service';
import { VerifyEmailToken } from 'src/common/interfaces/verify-email-token';
import { ServiceResponse } from 'src/common/interfaces/response';
import { AccountVerificationEmailService } from 'src/email/account-verification-email.service';
import { AccountVerificationTokenService } from 'src/tokens/account-verification-token.service';

@Injectable()
export class AccountVerificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly accountVerificationTokenService: AccountVerificationTokenService,
    private readonly accountVerificationEmailService: AccountVerificationEmailService,
  ) {}

  async verifyEmail(token: string): Promise<ServiceResponse> {
    const decodedToken: VerifyEmailToken =
      this.accountVerificationTokenService.verify(token);

    if (!decodedToken) {
      return { success: false, message: 'Link is expired' };
    }

    const email: string = decodedToken.email;
    const user = await this.prisma.users.findUnique({ where: { email } });

    if (!user) {
      return { success: false };
    }

    if (user.verified) {
      return { success: true, message: 'This account is already verified' };
    }

    await this.prisma.users.update({
      where: { email },
      data: { verified: true },
    });

    this.confirm(email);

    return { success: true };
  }

  async resendVerificationLink(token: string): Promise<void> {
    const decodedToken: VerifyEmailToken =
      this.accountVerificationTokenService.verify(token, true);
    if (!decodedToken) {
      throw new ForbiddenException('Invalid token');
    }
    this.init(decodedToken.email);
  }

  async init(email: string) {
    const token: string = this.accountVerificationTokenService.generate({
      email,
      sub: 1,
    });
    const verificationLink: string = `${config.clientRedirects.accountVerification}?token=${token}`;
    await this.accountVerificationEmailService.send(email, verificationLink);
  }

  async confirm(email: string) {
    await this.accountVerificationEmailService.sendConfirmation(email);
  }
}
