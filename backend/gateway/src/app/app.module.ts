import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { SharedModule } from '../shared/main';
import configList from '../common/config/config/main';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configList],
    }),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
