import { AxiosResponse, isAxiosError } from 'axios';

export const maybeCatchError = (error: any) => {
  let response;

  if (isAxiosError(error) && error?.response?.data) {
    response = error.response.data;
  } else if (isAxiosError(error)) {
    response = error.response;
  } else if (error instanceof Error) {
    response = error.message;
  } else {
    response = 'Непредвиденная ошибка';
  }

  return response;
};
