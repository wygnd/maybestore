import { Inject, Injectable } from '@nestjs/common';
import { MICROSERVICES } from '../shared/constants/app/app.contstants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { ProductsService } from '../shared/microservices/products/services/service';

@Injectable()
export class AppService {
  constructor(private readonly productsService: ProductsService) {}

  public async healthCheck() {
    return {
      gateway: {
        status: true,
      },
      microservices: [await this.productsService.checkHealth()],
    };
  }
}
