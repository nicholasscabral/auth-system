import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { config } from 'src/config/config';
import { AccountVerificationEmailService } from './account-verification-email.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: config.mailer,
    }),
  ],
  providers: [AccountVerificationEmailService],
  exports: [AccountVerificationEmailService],
})
export class EmailModule {}
