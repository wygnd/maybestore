import { Inject, Injectable } from '@nestjs/common';
import { MICROSERVICES } from './shared/constants/app/app.contstants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor() // @Inject(MICROSERVICES.Products) private productsClient: ClientProxy,
  {}

  public async healthCheck() {
    // const microservicesHealth = await Promise.all([
    //   this.checkService(this.productsClient.send({ cmd: 'check_health' }, {})),
    // ]);

    return {
      gateway: {
        status: true,
      },
      microservices: true,
    };
  }

  private async checkService(observable: Observable<any>) {
    try {
      return await firstValueFrom(observable);
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }
}
