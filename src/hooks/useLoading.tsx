import { useContext } from 'react';
import { LoadingContext } from 'contexts';

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

  return {
    isLoading,
    startLoading,
    stopLoading
  } as {
    isLoading: () => boolean;
    startLoading: () => void;
    stopLoading: () => void;
  };
}