import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

function mapValidationErrors(errors: ValidationError[]) {
  // todo
  return [];
}

export const setupValidationConfig = (): ValidationPipe => {
  return new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: false,
    validationError: {
      target: false,
      value: false,
    },
    exceptionFactory: (errors) =>
      new BadRequestException({
        message: 'Validation failed',
        errors: mapValidationErrors(errors),
      }),
  });
};
