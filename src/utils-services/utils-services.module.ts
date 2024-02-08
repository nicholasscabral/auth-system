import { Global, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { LoggerService } from './logger.service';

@Global()
@Module({
  providers: [TokenService, LoggerService],
  exports: [TokenService, LoggerService],
})
export class UtilsServicesModule {}
