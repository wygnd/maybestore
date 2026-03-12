import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICES } from '../../../constants/app/app.contstants';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';
import { maybeCatchError } from '../../../utils/catch-error';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(MICROSERVICES.Products)
    private readonly productsClient: ClientProxy,
  ) {}

  /**
   * Проверка работоспособности сервиса
   */
  public async checkHealth() {
    return await firstValueFrom(
      this.productsClient.send({ cmd: 'health' }, {}).pipe(
        timeout(300),
        catchError((err) => {
          return of({
            status: false,
            details: maybeCatchError(err),
          });
        }),
      ),
    );
  }
}
