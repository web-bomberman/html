import { useContext } from 'react';
import { TokenContext } from 'contexts';

export function useToken() {
  const { token, setToken } = useContext(TokenContext);
  return [
    token,
    setToken,
    () => setToken('')
  ];
}