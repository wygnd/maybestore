import { IEnvironmentOptions } from '../../../shared/interfaces/config/main';

export default (): Pick<IEnvironmentOptions, 'RABBIT_MQ'> => ({
  RABBIT_MQ: {
    URL: process.env.RABBITMQ_URL,
  },
});
