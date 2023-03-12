import { useContext } from 'react';
import { TokenContext } from 'contexts';

export function useToken() {
  const { token, setToken } = useContext(TokenContext);
  return {
    token,
    setToken,
    clearToken: () => setToken(''),
  } as {
    token: string;
    setToken: (newToken: string) => void;
    clearToken: () => void;
  };
}
