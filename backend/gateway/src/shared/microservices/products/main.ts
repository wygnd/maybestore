import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MICROSERVICES } from '../../constants/app/app.contstants';
import { IS_PROD } from '../../constants/main';
import { IEnvironmentOptions } from '../../interfaces/config/main';
import { ProductsService } from './services/service';
import { QUEUE_LIST } from '../constants/queue/main';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: MICROSERVICES.Products,
        useFactory: (configService: ConfigService<IEnvironmentOptions>) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.getOrThrow<string>('RABBIT_MQ.URL', {
                infer: true,
              }),
            ],
            queueOptions: {
              durable: true,
            },
            queue: QUEUE_LIST.PRODUCTS,
            prefetchCount: 1, // обработка 1 сообщения за раз
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class MicroserviceProductsModule {}
