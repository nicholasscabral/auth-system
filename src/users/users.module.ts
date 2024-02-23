import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/providers/database/prisma.service';
import { AccountVerificationModule } from 'src/account-verification/account-verification.module';
import { AccountVerificationService } from 'src/account-verification/account-verification.service';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [AccountVerificationModule, TokensModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AccountVerificationService],
  exports: [UsersService, PrismaService, AccountVerificationService],
})
export class UsersModule {}
