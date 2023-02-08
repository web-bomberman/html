import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotify } from 'react-observer-implementation';
import { useTimeout } from 'react-timers-hooks';
import { useAlert } from 'react-styled-alert';
import { useRequest, useLoading } from 'hooks';
import { Typography } from '@mui/material';

export function useNewSession() {
  const [timer, setTimer] = useState<number>(0);
  const navigate = useNavigate();
  const alert = useAlert();
  const startTransition = useNotify('route_changing');
  const finishTransition = useNotify('route_changed');
  const { startLoading, stopLoading } = useLoading();
  const api = useRequest<{ session: string }>('/session/new');

  useTimeout(() => {
    finishTransition();
    startLoading();
    setTimer(0);
  }, timer ? timer : null);

  return () => {
    startTransition();
    setTimer(500);
    api.post(
      {},
      (res) => navigate(`/session/${res.data.session}`),
      (err) => {
        stopLoading();
        setTimer(0);
        finishTransition();
        alert(
          <Typography
            variant='body1'
            color='error'
            textAlign='center'
          >
            {err.message}
          </Typography>
        );
      }
    );
  };
}