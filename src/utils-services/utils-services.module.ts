import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { PasswordService } from './password.service';
import { ResetPasswordService } from './reset-password.service';
import { UsersModule } from 'src/users/users.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { EmailModule } from 'src/email/email.module';

@Global()
@Module({
  imports: [UsersModule, TokensModule, EmailModule],
  providers: [LoggerService, PasswordService, ResetPasswordService],
  exports: [LoggerService, PasswordService, ResetPasswordService],
})
export class UtilsServicesModule {}
