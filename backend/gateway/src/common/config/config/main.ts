import { IEnvironmentOptions } from '../../../shared/interfaces/config/main';
import microservicesConfig from './microservices.config';
import rabbitMqConfig from './rabbit-mq.config';

export default (): IEnvironmentOptions => ({
  APP_TITLE: process.env.APP_TITLE,
  PORT: process.env.PORT,
  ...microservicesConfig(),
  ...rabbitMqConfig(),
});
