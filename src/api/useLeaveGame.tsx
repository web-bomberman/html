import { useState } from 'react';
import axios from 'axios';
import { useRoute, useToken } from 'hooks';

export function useLeaveGame() {
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useToken();
  const { changeRoute } = useRoute();

  const API_URL: string = import.meta.env.VITE_API_URL as string;

  const request = () => {
    setLoading(true);
    axios
      .post(
        API_URL + '/sessions/leave',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        changeRoute('/');
      })
      .catch(() => {
        setLoading(false);
        changeRoute('/');
      });
  };

  return [loading, request] as [loading: boolean, request: () => void];
}
