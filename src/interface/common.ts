import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
  meta: {
    page?: number;
    limit?: number;
    total?: number;
  };
  data: T[];
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
  email?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};