import { NestFastifyApplication } from '@nestjs/platform-fastify';

export const compressionConfig = async (app: NestFastifyApplication) => {
  await app.register(require('@fastify/compress'));
};
