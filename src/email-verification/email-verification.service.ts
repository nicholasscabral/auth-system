import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
      throw new UnauthorizedException('Token is expired');
    }

    const email: string = decodedToken.email;
    const user = await this.prisma.tB_USERS.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException();
    }

    if (user.email_verified) {
      return { message: 'This account is already verified, please login' };
    }

    await this.prisma.tB_USERS.update({
      where: { email },
      data: { email_verified: true },
    });

    this.sendAccountVerifiedEmail(email);
  }

  async resendVerificationLink(token: string): Promise<void> {
    const { email }: VerifyEmailToken = this.tokenService.decode(token);
    this.sendVerificationLink(email);
  }

  async sendVerificationLink(email: string): Promise<void> {
    const token: string = this.tokenService.generateToken({ email }, '1d');
    const confirmationLink: string = `${config.verifyEmailRedirectUrl}?token=${token}`;
    this.mailer
      .sendMail({
        to: email,
        subject: 'Verify your account',
        html: `<p>Please verify your email to access your account</p> <a href="${confirmationLink}" target="_blank">Activate account</a>`,
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
