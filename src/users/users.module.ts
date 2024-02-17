import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/providers/database/prisma.service';
import { EmailVerificationModule } from 'src/email-verification/email-verification.module';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';

@Module({
  imports: [EmailVerificationModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, EmailVerificationService],
  exports: [UsersService, PrismaService, EmailVerificationService],
})
export class UsersModule {}
