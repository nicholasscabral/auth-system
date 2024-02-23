import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { AccessTokenService } from './access-token.service';
import { RefreshTokenService } from './refresh-token.service';
import { VerificationEmailTokenService } from './verification-email-token.service';
import { PrismaService } from 'src/providers/database/prisma.service';

@Module({
  providers: [
    PrismaService,
    TokenService,
    AccessTokenService,
    RefreshTokenService,
    VerificationEmailTokenService,
  ],
  exports: [
    PrismaService,
    TokenService,
    AccessTokenService,
    RefreshTokenService,
    VerificationEmailTokenService,
  ],
})
export class TokensModule {}
