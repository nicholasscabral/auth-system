import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { config } from './config/config';
import { EmailVerificationModule } from './email-verification/email-verification.module';
import { UtilsServicesModule } from './utils-services/utils-services.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true, secret: config.jwtSecret }),
    UsersModule,
    EmailVerificationModule,
    UtilsServicesModule,
    AuthModule,
    TokensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
