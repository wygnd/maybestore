import winston from 'winston';
import { join } from 'path';
import { LOG_DIR } from '../../shared/constants/app/app.contstants';

export class WinstonLogger {
  private logger: winston.Logger;

  constructor(filename: string, filepath: string) {
    const loggerDir = join(process.cwd(), LOG_DIR, ...filepath.split('/'));
  }
}
