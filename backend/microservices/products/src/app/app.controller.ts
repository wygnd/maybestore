import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @MessagePattern({ cmd: 'health' })
  private checkHealth() {
    return {
      status: true,
      service: this.configService.getOrThrow<string>('PRODUCTS_SERVICE_NAME'),
    };
  }
}
