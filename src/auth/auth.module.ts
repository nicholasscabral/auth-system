import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GithubOAuthStrategy } from './strategies/github.strategy';
import { GoogleOauthStrategy } from './strategies/google.strategy';
import { MicrosoftOAuthStrategy } from './strategies/microsoft.strategy';
import { UsersModule } from 'src/users/users.module';
import { PasswordService } from 'src/utils-services/password.service';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    GithubOAuthStrategy,
    GoogleOauthStrategy,
    MicrosoftOAuthStrategy,
    LocalStrategy,
    PasswordService,
    UsersService,
  ],
})
export class AuthModule {}
