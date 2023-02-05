import { AxiosRequestConfig } from 'axios';

export type ContainerProps = {
  bordered?: boolean;
  noBackground?: boolean;
  blur?: string;
  margin?: string;
  width?: string;
  height?: string;
  extra?: string;
}

export type UseRequestResponse<Type> = {
  status: number;
  data: Type;
}

export type UseRequestError = {
  status: number;
  message: string;
}

export type UseRequestReturn<Type> = {
  loading: boolean,
  get: (
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>
  ) => void,
  post: (
    body: object,
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>
  ) => void,
  put: (
    body: object,
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>
  ) => void,
  patch: (
    body: object,
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>
  ) => void,
  delete: (
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>
  ) => void
}