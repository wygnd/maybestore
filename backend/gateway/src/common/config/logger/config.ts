import winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { APP_LOG_DIR } from '../../../shared/constants/app/app.contstants';
import 'winston-daily-rotate-file';

export const loggerConfig = () => {
  const isProd = process.env.NODE_ENV === 'production';
  const level = isProd ? 'info' : 'debug';

  const format = winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
  );

  const fileTransport = new winston.transports.DailyRotateFile({
    level,
    dirname: APP_LOG_DIR,
    filename: 'app-%DATE%.log',
    maxFiles: '15d',
    datePattern: 'YYYY-MM-DD',
    handleExceptions: true,
    zippedArchive: true,
    format: winston.format.combine(format, winston.format.json()),
  });

  const logger = WinstonModule.createLogger({
    level,
    format: format,
    transports: [fileTransport],
    exitOnError: false,
  });

  // Обработка необработанных исключений и отклоненных промисов
  if (isProd) {
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught exception', { error, stack: error.stack });
      setTimeout(() => process.exit(1), 1000);
    });

    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled promise rejection', { reason });
    });
  }
  return logger;
};
