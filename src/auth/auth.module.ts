import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GithubOAuthStrategy } from './strategies/github.strategy';
import { GoogleOauthStrategy } from './strategies/google.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' })],
  controllers: [AuthController],
  providers: [AuthService, GithubOAuthStrategy, GoogleOauthStrategy],
})
export class AuthModule {}
