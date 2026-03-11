export interface IEnvironmentOptions {
  APP_TITLE?: string;
  PORT?: string;
  MICROSERVICES: IEnvironmentMicroservicesOptions;
  RABBIT_MQ: IEnvironmentRabbitMQOptions;
}

interface IEnvironmentMicroservicesOptions {
  PRODUCTS: IEnvironmentMicroservicesProductsOptions;
}

interface IEnvironmentMicroservicesProductsOptions {
  PORT?: string;
}

interface IEnvironmentRabbitMQOptions {
  URL?: string;
}
