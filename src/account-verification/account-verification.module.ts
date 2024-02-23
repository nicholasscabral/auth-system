import { Module } from '@nestjs/common';
import { AccountVerificationService } from './account-verification.service';
import { AccountVerificationController } from './account-verification.controller';
import { TokensModule } from 'src/tokens/tokens.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [EmailModule, TokensModule],
  providers: [AccountVerificationService],
  controllers: [AccountVerificationController],
  exports: [AccountVerificationService, EmailModule],
})
export class AccountVerificationModule {}
