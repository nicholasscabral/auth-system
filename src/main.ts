import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger';
import { DOCS_PATH } from './common/constans/routes';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import { initializePassport } from './config/passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  app.use(passport.initialize());
  initializePassport();

  // Validate DTO on route
  app.useGlobalPipes(new ValidationPipe());

  // Setup swagger documentation
  const docCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  };
  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(DOCS_PATH, app, doc, docCustomOptions);

  await app.listen(4000);
}
bootstrap();
