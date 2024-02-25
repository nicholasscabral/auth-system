import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { TokensModule } from 'src/tokens/tokens.module';
import { ResetPasswordTokenMiddleware } from './middlewares/reset-password-token.middleware';

@Module({
  imports: [PassportModule, UsersModule, TokensModule],
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
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('configurind middleareeeeeee');
    consumer
      .apply(ResetPasswordTokenMiddleware)
      .forRoutes(
        'auth/forgot-password/callback/:token',
        'auth/reset-password/:token',
      );
  }
}
