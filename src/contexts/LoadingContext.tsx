import React, { createContext, useState } from 'react';

export const LoadingContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({ loading: false, setLoading: () => {} });

export function LoadingProvider(props: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <LoadingContext.Provider value={{ loading: loading, setLoading: setLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
}