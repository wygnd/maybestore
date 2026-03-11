import { Module } from '@nestjs/common';
import { MicroservicesModule } from './microservices/main';

@Module({
  imports: [MicroservicesModule],
  exports: [MicroservicesModule],
})
export class SharedModule {}
