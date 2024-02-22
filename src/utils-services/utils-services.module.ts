import { Global, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { LoggerService } from './logger.service';
import { PasswordService } from './password.service';
import { PrismaService } from 'src/providers/database/prisma.service';

@Global()
@Module({
  providers: [TokenService, LoggerService, PasswordService, PrismaService],
  exports: [TokenService, LoggerService, PasswordService, PrismaService],
})
export class UtilsServicesModule {}
