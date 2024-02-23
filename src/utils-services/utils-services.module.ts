import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { PasswordService } from './password.service';

@Global()
@Module({
  providers: [LoggerService, PasswordService],
  exports: [LoggerService, PasswordService],
})
export class UtilsServicesModule {}
