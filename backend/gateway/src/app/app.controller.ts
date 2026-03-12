import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Проверка работоспособности сервиса' })
  @Get('/health')
  healthCheck() {
    return this.appService.healthCheck();
  }
}
