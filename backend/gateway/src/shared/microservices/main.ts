import { Module } from '@nestjs/common';
import { MicroserviceProductsModule } from './products/main';

@Module({
  imports: [MicroserviceProductsModule],
  exports: [MicroserviceProductsModule],
})
export class MicroservicesModule {}
