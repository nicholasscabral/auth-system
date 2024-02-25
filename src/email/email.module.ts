import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { config } from 'src/config/config';
import { AccountVerificationEmailService } from './account-verification-email.service';
import { ResetPasswordEmailService } from './reset-password-email.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: config.mailer,
    }),
  ],
  providers: [AccountVerificationEmailService, ResetPasswordEmailService],
  exports: [AccountVerificationEmailService, ResetPasswordEmailService],
})
export class EmailModule {}
