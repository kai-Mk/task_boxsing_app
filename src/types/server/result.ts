export type ServiceError = {
  success: false;
  message: string;
  status: number;
};

export type ServiceSuccess<T> = {
  success: true;
  data: T;
};

export type ServiceResult<T> = ServiceSuccess<T> | ServiceError;
