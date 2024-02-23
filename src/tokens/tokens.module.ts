import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { AccessTokenService } from './access-token.service';
import { RefreshTokenService } from './refresh-token.service';
import { PrismaService } from 'src/providers/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config/config';
import { AccountVerificationTokenService } from './account-verification-token.service';

@Module({
  imports: [JwtModule.register({ secret: config.jwtSecret })],
  providers: [
    PrismaService,
    TokenService,
    AccessTokenService,
    RefreshTokenService,
    AccountVerificationTokenService,
  ],
  exports: [
    PrismaService,
    TokenService,
    AccessTokenService,
    RefreshTokenService,
    AccountVerificationTokenService,
  ],
})
export class TokensModule {}
