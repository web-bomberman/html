import { useState } from 'react';
import axios from 'axios';
import { useAlert } from 'react-styled-alert';
import { useObserve } from 'react-observer-implementation';
import { Typography } from '@mui/material';
import { useToken } from 'hooks';

export function useSetReady() {
  const [loading, setLoading] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const alert = useAlert();
  const { token } = useToken();

  const API_URL: string = import.meta.env.VITE_API_URL as string;

  useObserve('disconnected', () => {
    if (!ready) return;
    setReady(false);
    setLoading(true);
    axios
      .post(
        API_URL + '/sessions/ready',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  });

  const request = () => {
    setLoading(true);
    axios
      .post(
        API_URL + '/sessions/ready',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setReady(res.data.ready);
      })
      .catch((err) => {
        setLoading(false);
        alert(
          <Typography variant="body1" color="error" textAlign="center">
            {err.message}
          </Typography>
        );
      });
  };

  return [loading, ready, request] as [
    loading: boolean,
    ready: boolean,
    request: () => void
  ];
}
