import { FastifyAdapter } from '@nestjs/platform-fastify';

export const buildFastifyAdapter = (): FastifyAdapter => {
  return new FastifyAdapter({
    trustProxy: true,
  });
};
