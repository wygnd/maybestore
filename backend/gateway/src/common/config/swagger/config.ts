import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export const setupSwaggerConfig = (app: NestFastifyApplication) => {
  const config = new DocumentBuilder()
    .setTitle('process.env.APP_TITLE')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);
};
