export type BaseResponseModel<T> = {
  success: boolean;
  error: string[];
  data?: T;
  validationResult: string[];
};
