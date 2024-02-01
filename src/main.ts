import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import newrelic from 'newrelic';
import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger';
import { DOCS_PATH } from './common/constans/routes';
import { config } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const docCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  };

  const doc = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(DOCS_PATH, app, doc, docCustomOptions);

  console.log(config.env);

  await app.listen(4000);
}
bootstrap();
