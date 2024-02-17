import { Global, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { LoggerService } from './logger.service';
import { PasswordService } from './password.service';

@Global()
@Module({
  providers: [TokenService, LoggerService, PasswordService],
  exports: [TokenService, LoggerService, PasswordService],
})
export class UtilsServicesModule {}
