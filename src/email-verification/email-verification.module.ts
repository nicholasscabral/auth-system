import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { config } from 'src/config/config';
import { EmailVerificationService } from './email-verification.service';
import { EmailVerificationController } from './email-verification.controller';
import { PrismaService } from 'src/providers/database/prisma.service';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: config.mailer,
    }),
    TokensModule,
  ],
  providers: [EmailVerificationService, PrismaService],
  controllers: [EmailVerificationController],
  exports: [EmailVerificationService],
})
export class EmailVerificationModule {}
