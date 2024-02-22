import { ForbiddenException, Injectable } from '@nestjs/common';
import { TokenService } from '../utils-services/token.service';
import { config } from 'src/config/config';
import { MailerService } from '@nestjs-modules/mailer';
import { LoggerService } from 'src/utils-services/logger.service';
import { PrismaService } from 'src/providers/database/prisma.service';
import { VerifyEmailToken } from 'src/common/interfaces/verify-email-token';
import { ServiceResponse } from 'src/common/interfaces/response';

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly mailer: MailerService,
    private readonly tokenService: TokenService,
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
  ) {}

  async verifyEmail(token: string): Promise<ServiceResponse> {
    const decodedToken: VerifyEmailToken = this.tokenService.verifyToken(
      token,
    ) as VerifyEmailToken;

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

    this.sendAccountVerifiedEmail(email);

    return { success: true };
  }

  async resendVerificationLink(token: string): Promise<void> {
    const decodedToken: VerifyEmailToken = this.tokenService.verifyToken(
      token,
      true,
    );
    if (!decodedToken) {
      throw new ForbiddenException('Invalid token');
    }
    this.sendVerificationLink(decodedToken.email);
  }

  async sendVerificationLink(email: string): Promise<void> {
    const token: string = this.tokenService.generateVerificationEmailToken({
      email,
    });
    const confirmationLink: string = `${config.verifyEmailRedirectUrl}?token=${token}`;
    this.mailer
      .sendMail({
        to: email,
        subject: 'Verify your account',
        html: `<p>Please verify your email to access your account</p> <a href="${confirmationLink}" target="_blank">Activate account</a> <p>This link will be valid for the next 24 hours</p>`,
      })
      .then(() => this.logger.log(`Confirmation email sent to ${email}`))
      .catch((e) =>
        this.logger.error(
          `Failed to send confirmation email to ${email}; Error: ${e.message}`,
          e,
        ),
      );
  }

  private async sendAccountVerifiedEmail(email: string): Promise<void> {
    this.mailer
      .sendMail({
        to: email,
        subject: 'Account verified',
        html: 'Thank you for verifying your account',
      })
      .then(() => this.logger.log(`Account verified email sent to ${email}`))
      .catch((e) =>
        this.logger.error(
          `Failed to send account verified email to ${email}; Error: ${e.message}`,
          e,
        ),
      );
  }
}
