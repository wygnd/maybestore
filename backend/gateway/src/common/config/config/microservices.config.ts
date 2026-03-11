import { IEnvironmentOptions } from '../../../shared/interfaces/config/main';

export default (): Pick<IEnvironmentOptions, 'MICROSERVICES'> => ({
  MICROSERVICES: {
    PRODUCTS: {
      PORT: process.env.PRODUCTS_PORT,
    },
  },
});
