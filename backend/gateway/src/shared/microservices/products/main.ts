import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MICROSERVICES } from '../../constants/app/app.contstants';
import { IS_PROD } from '../../constants/main';
import { IEnvironmentOptions } from '../../interfaces/config/main';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: MICROSERVICES.Products,
        useFactory: (configService: ConfigService<IEnvironmentOptions>) => ({
          transport: Transport.RMQ,
          options: {
            url: [configService.getOrThrow('RABBIT_MQ.URL', { infer: true })],
            host: IS_PROD ? 'products' : 'localhost',
            port: parseInt(
              configService.getOrThrow('MICROSERVICES.PRODUCTS.PORT', {
                infer: true,
              }),
            ),
            queueOptions: {
              durable: true,
            },
            noAck: false, // Ручное подтверждение сообщений
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
})
export class MicroserviceProductsModule {}
