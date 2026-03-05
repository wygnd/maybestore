import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern({ cmd: 'check_health' })
  health() {
    return {
      service: 'Products',
      status: true,
    };
  }
}
