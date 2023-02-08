import { useContext } from 'react';
import { LoadingContext } from 'contexts';
import { UseLoadingResponse } from 'types';

export function useLoading() {
  const { loading, setLoading } = useContext(LoadingContext);

  const isLoading = () => {
    return loading;
  }

  const startLoading = () => {
    setLoading(true);
  }

  const stopLoading = () => {
    setLoading(false);
  }

  return { isLoading, startLoading, stopLoading } as UseLoadingResponse;
}