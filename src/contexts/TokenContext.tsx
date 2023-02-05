import React, { createContext, useState } from 'react';

export const TokenContext = createContext<{
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}>({ token: '', setToken: () => {} });

export function TokenProvider(props: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>('');
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}