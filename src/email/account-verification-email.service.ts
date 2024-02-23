import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/utils-services/logger.service';

@Injectable()
export class AccountVerificationEmailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly logger: LoggerService,
  ) {}

  async send(email: string, verificationLink: string): Promise<void> {
    this.mailer
      .sendMail({
        to: email,
        subject: 'Verify your account',
        html: `<p>Please verify your email to access your account</p> <a href="${verificationLink}" target="_blank">Activate account</a> <p>This link will be valid for the next 24 hours</p>`,
      })
      .then(() => this.logger.log(`Confirmation email sent to ${email}`))
      .catch((e) =>
        this.logger.error(
          `Failed to send confirmation email to ${email}; Error: ${e.message}`,
          e,
        ),
      );
  }

  async sendConfirmation(email: string): Promise<void> {
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
