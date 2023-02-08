import { useState, useEffect, useRef } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UseRequestResponse,
  UseRequestError,
  UseRequestAborters,
  UseRequestReturn
} from 'types';

const API_URL: string = import.meta.env.VITE_API_URL as string;

export function useRequest<Type>(route: string): UseRequestReturn<Type> {
  const [loading, setLoading] = useState<boolean>(false);
  const aborters = useRef<UseRequestAborters>({
    get: new AbortController(),
    post: new AbortController(),
    put: new AbortController(),
    patch: new AbortController(),
    delete: new AbortController()
  });

  useEffect(() => {
    return () => {
      aborters.current.get.abort();
      aborters.current.post.abort();
      aborters.current.patch.abort();
      aborters.current.put.abort();
      aborters.current.delete.abort();
    };
  }, [])

  const url = API_URL + route;
  
  const thenFunc =
    (func: (res: UseRequestResponse<Type>) => void) =>
    (res: AxiosResponse<any, any>) =>
  {
    func({ status: res.status, data: res.data as Type });
    setLoading(false);
  };

  const catchFunc =
    (func: (err: UseRequestError) => void) =>
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
    aborters.current.get.abort();
    axios
      .get(url, { ...config, signal: aborters.current.get.signal })
      .then(thenFunc(thenFn))
      .catch(catchFunc(catchFn));
  };

  const postReq = (
    body: object,
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>,
  ) => {
    setLoading(true);
    aborters.current.post.abort();
    axios
      .post(url, body, { ...config, signal: aborters.current.post.signal })
      .then(thenFunc(thenFn))
      .catch(catchFunc(catchFn));
  };

  const patchReq = (
    body: object,
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>,
  ) => {
    setLoading(true);
    aborters.current.patch.abort();
    axios
      .patch(url, body, { ...config, signal: aborters.current.patch.signal })
      .then(thenFunc(thenFn))
      .catch(catchFunc(catchFn));
  };

  const putReq = (
    body: object,
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>,
  ) => {
    setLoading(true);
    aborters.current.put.abort();
    axios
      .put(url, body, { ...config, signal: aborters.current.put.signal })
      .then(thenFunc(thenFn))
      .catch(catchFunc(catchFn));
  };

  const deleteReq = (
    thenFn: (res: UseRequestResponse<Type>) => void,
    catchFn: (err: UseRequestError) => void,
    config?: AxiosRequestConfig<any>,
  ) => {
    setLoading(true);
    aborters.current.delete.abort();
    axios
      .delete(url, { ...config, signal: aborters.current.delete.signal })
      .then(thenFunc(thenFn))
      .catch(catchFunc(catchFn));
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