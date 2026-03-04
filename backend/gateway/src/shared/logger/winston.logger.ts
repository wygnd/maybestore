import winston from 'winston';
import { join } from 'path';
import { APP_LOG_DIR } from '../constants/app/app.contstants';

export class WinstonLogger {
  private logger: winston.Logger;

  constructor(filename: string, filepath: string) {
    const loggerDir = join(process.cwd(), APP_LOG_DIR, ...filepath.split('/'));
  }
}
