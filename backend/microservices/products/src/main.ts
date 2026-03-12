import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { join } from 'path';
import { IS_PROD } from './shared/constants/main';

config({
  debug: !IS_PROD,
  path: join(process.cwd(), '..', '..', '.env'),
  encoding: 'utf8',
});

async function bootstrap() {
  const logger = new Logger('Application');
  const rabbitmqUrl = process.env.RABBITMQ_URL;

  if (!rabbitmqUrl) {
    const msg = 'RABBITMQ_URL is required';
    logger.error(msg);
    throw new Error(msg);
  }

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqUrl],
      queueOptions: {
        durable: true,
      },
      queue: 'products_queue',
      prefetchCount: 1, // обрабатывать по 1 сообщению за раз
    },
  });

  await app.listen();
  logger.log(`Microservice started`);
}

bootstrap();
