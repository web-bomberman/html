import { useState } from 'react';
import axios from 'axios';
import { useAlert } from 'react-styled-alert';
import { Typography } from '@mui/material';
import { useToken } from 'hooks';

export function useStartGame() {
  const [loading, setLoading] = useState<boolean>(false);
  const alert = useAlert();
  const { token } = useToken();

  const API_URL: string = import.meta.env.VITE_API_URL as string;

  const request = () => {
    setLoading(true);
    axios
      .post(
        API_URL + '/sessions/start-game',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false);
        alert(
          <Typography variant="body1" color="error" textAlign="center">
            {err.message}
          </Typography>
        );
      });
  };

  return [loading, request] as [loading: boolean, request: () => void];
}
