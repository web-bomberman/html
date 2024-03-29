import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useNotify } from 'react-observer-implementation';
import { useTimeout } from 'react-timers-hooks';
import { useAlert } from 'react-styled-alert';
import { useLoading } from 'hooks';
import { Typography } from '@mui/material';

export function useNewSession() {
  const [timer, setTimer] = useState<number>(0);
  const [transitioned, setTransitioned] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>('');
  const navigate = useNavigate();
  const alert = useAlert();
  const startTransition = useNotify('route_changing');
  const finishTransition = useNotify('route_changed');
  const { startLoading, stopLoading } = useLoading();

  const API_URL: string = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    if (sessionId && transitioned) navigate(`/${sessionId}`);
  }, [sessionId, transitioned]);

  useTimeout(
    () => {
      setTransitioned(true);
      finishTransition();
      startLoading();
      setTimer(0);
    },
    timer ? timer : null
  );

  return () => {
    startTransition();
    setTimer(500);
    axios
      .post(API_URL + '/sessions/new')
      .then((res) => setSessionId(res.data.session))
      .catch((err) => {
        setTransitioned(false);
        stopLoading();
        setTimer(0);
        finishTransition();
        alert(
          <Typography variant="body1" color="error" textAlign="center">
            {err.message}
          </Typography>
        );
      });
  };
}
