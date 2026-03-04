import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('process.env.APP_TITLE')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);
};
