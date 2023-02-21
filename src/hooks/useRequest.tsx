import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import {
  UseRequestResponse,
  UseRequestError,
  UseRequestReturn
} from 'types';

const API_URL: string = import.meta.env.VITE_API_URL as string;

export function useRequest<Type>(route: string): UseRequestReturn<Type> {
  const [loading, setLoading] = useState<boolean>(false);

  const url = API_URL + route;
  
  const hookThen =
    (func: (hookRes: UseRequestResponse<Type>) => void) =>
    (res: AxiosResponse<any, any>) =>
  {
    func({ status: res.status, data: res.data as Type });
    setLoading(false);
  };

  const hookCatch =
    (func: (hookErr: UseRequestError) => void) =>
    (err: any) =>
  {
    let error: UseRequestError = {
      status: 500,
      message: 'Internal server error'
    };
    if (axios.isAxiosError(err) && err.response)
      error = {
        status: err.response.status,
        message: err.response.data as string
      };
    else console.log(err);
    func(error);
    setLoading(false);
  };

  const getReq = (
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>,
  ) => {
    setLoading(true);
    axios
      .get(url, { ...config })
      .then(hookThen(thenFn))
      .catch(hookCatch(catchFn));
  };

  const postReq = (
    body: object,
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>,
  ) => {
    setLoading(true);
    axios
      .post(url, body, { ...config })
      .then(hookThen(thenFn))
      .catch(hookCatch(catchFn));
  };

  const patchReq = (
    body: object,
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>,
  ) => {
    setLoading(true);
    axios
      .patch(url, body, { ...config })
      .then(hookThen(thenFn))
      .catch(hookCatch(catchFn));
  };

  const putReq = (
    body: object,
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>,
  ) => {
    setLoading(true);
    axios
      .put(url, body, { ...config })
      .then(hookThen(thenFn))
      .catch(hookCatch(catchFn));
  };

  const deleteReq = (
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>,
  ) => {
    setLoading(true);
    axios
      .delete(url, { ...config })
      .then(hookThen(thenFn))
      .catch(hookCatch(catchFn));
  };
  
  return {
    loading,
    get: getReq,
    post: postReq,
    patch: patchReq,
    put: putReq,
    delete: deleteReq
  };
}