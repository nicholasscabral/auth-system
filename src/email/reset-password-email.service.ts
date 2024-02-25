import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class ResetPasswordEmailService {
  constructor(
    private readonly mailer: MailerService, // private readonly logger: LoggerService,
  ) {}

  async send(email: string, resetLink: string): Promise<void> {
    this.mailer.sendMail({
      to: email,
      subject: 'Reset password',
      html: `<p>Here is the link to reset your password</p> <a href="${resetLink}" target="_blank">Reset password</a> <p>This link will be valid for the next 15 minutes</p>`,
    });
    // .then(() => this.logger.log(`Reset password email sent to ${email}`))
    // .catch((e: Error) =>
    //   this.logger.error(
    //     `Failed to send reset password email to ${email}; Error: ${e.message}`,
    //     e,
    //   ),
    // );
  }

  async sendConfirmation(email: string): Promise<void> {
    this.mailer.sendMail({
      to: email,
      subject: 'Password changes successfully',
      html: `<p>Your password has been successfully updated. <a href="http://localhost:3000/signin" target="_blank">Click here to login</a></p>`,
    });
    // .then(() =>
    //   this.logger.log(`Reset password confirmation email sent to ${email}`),
    // )
    // .catch((e: Error) =>
    //   this.logger.error(
    //     `Failed to send reset password confirmation email to ${email}; Error: ${e.message}`,
    //     e,
    //   ),
    // );
  }
}
