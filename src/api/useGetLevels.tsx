import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from 'react-styled-alert';
import { useTimeout } from 'react-timers-hooks';
import { Typography } from '@mui/material';
import { useRoute } from 'hooks';
import { Level } from 'types';

export function useGetLevels() {
  const [levels, setLevels] = useState<Level[] | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [disconnectTimer, setDisconnectTimer] = useState<number>(0);
  const alert = useAlert();
  const { changeRoute } = useRoute();

  const API_URL: string = import.meta.env.VITE_API_URL as string;

  const request = () => {
    axios
      .get(API_URL + '/levels')
      .then((res) => {
        setDisconnectTimer(0);
        setLevels([...res.data]);
      })
      .catch(() => {
        setDisconnectTimer(15000);
        setTimer(200);
      });
  };

  useEffect(request, []);

  useTimeout(
    () => {
      setTimer(0);
      request();
    },
    timer ? timer : null
  );

  useTimeout(
    () => {
      changeRoute('/');
      alert(
        <Typography variant="body1" color="error" textAlign="center">
          Failed to retrieve levels
        </Typography>
      );
    },
    disconnectTimer ? disconnectTimer : null
  );

  return levels;
}
