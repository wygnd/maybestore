import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { buildFastifyAdapter } from './common/config/fastify/config';
import { setupSwaggerConfig } from './common/config/swagger/config';
import { setupValidationConfig } from './common/config/validation/config';
import { compressionConfig } from './common/config/compression/config';
import { ConfigService } from '@nestjs/config';
import { IEnvironmentOptions } from './shared/interfaces/config/main';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { config } from 'dotenv';

config({
  debug: false,
  path: join(process.cwd(), '..', '.env'),
  encoding: 'utf8',
});

async function bootstrap() {
  // Собираем инстанс приложения
  const fastifyAdapter = buildFastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  const logger = new Logger('Application');
  const config = app.get(ConfigService<IEnvironmentOptions>);
  const PORT = parseInt(config.getOrThrow('PORT'));

  // Глобальный префикс /api
  app.setGlobalPrefix('/api');

  // Собираем документация
  setupSwaggerConfig(app);

  // Используем сжатие
  await compressionConfig(app);

  // Валидация запросов
  app.useGlobalPipes(setupValidationConfig());

  await app.listen(PORT, '0.0.0.0');
  logger.log(`Server started: http://localhost:${PORT}/`);
}

bootstrap();
