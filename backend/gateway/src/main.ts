import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { buildFastifyAdapter } from './common/config/fastify/config';
import { setupSwaggerConfig } from './common/config/swagger/config';
import { setupValidationConfig } from './common/config/validation/config';
import { compressionConfig } from './common/config/compression/config';

async function bootstrap() {
  // Собираем инстанс приложения
  const fastifyAdapter = buildFastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  // Глобальный префикс /api
  app.setGlobalPrefix('/api');

  // Собираем документация
  setupSwaggerConfig(app);

  // Используем сжатие
  await compressionConfig(app);

  // Валидация запросов
  app.useGlobalPipes(setupValidationConfig());

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
