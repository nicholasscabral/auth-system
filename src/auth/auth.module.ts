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

@Module({
  imports: [PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    GithubOAuthStrategy,
    GoogleOauthStrategy,
    MicrosoftOAuthStrategy,
    PasswordService,
    UsersService,
  ],
})
export class AuthModule {}
