import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { IS_PROD } from '../shared/constants/main';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { join } from 'path';

config({
  debug: false,
  path: join(process.cwd(), '..', '..', '.env'),
  encoding: 'utf8',
});

async function bootstrap() {
  const rabbitmqUrl = process.env.RABBITMQ_URL;

  if (!rabbitmqUrl) throw new Error('RABBITMQ_URL is required');
  console.log(rabbitmqUrl);
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqUrl],
      queueOptions: {
        durable: true,
      },
      noAck: false, // ручное подтверждение
      prefetchCount: 1, // обрабатывать по 1 сообщению за раз
    },
  });

  const logger = new Logger('Application');

  await app.listen();
  logger.log(`Microservice started`);
}

bootstrap();
