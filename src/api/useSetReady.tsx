import { useState } from 'react';
import { useAlert } from 'react-styled-alert';
import { useObserve } from 'react-observer-implementation';
import { Typography } from '@mui/material';
import { useToken, useRequest } from 'hooks';

export function useSetReady() {
  const [ready, setReady] = useState<boolean>(false);
  const alert = useAlert();
  const { token } = useToken();
  const api = useRequest<{ ready: boolean }>('/sessions/ready');

  useObserve(
    'disconnected',
    () => {
      if (!ready) return;
      setReady(false);
      api.post(
        {},
        () => {},
        () => {},
        { headers: {
          Authorization: `Bearer ${token}`
        }}
      )
    }
  );

  const request = () => {
    api.post(
      {},
      (res) => setReady(res.data.ready),
      (err) => alert(
        <Typography
          variant='body1'
          color='error'
          textAlign='center'
        >
          {err.message}
        </Typography>
      ),
      { headers: {
        Authorization: `Bearer ${token}`
      }}
    );
  };

  return [api.loading, ready, request] as [
    loading: boolean,
    ready: boolean,
    request: () => void
  ];
}