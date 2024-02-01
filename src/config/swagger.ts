import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('OAuth-API')
  .setVersion('1.0')
  .build();
