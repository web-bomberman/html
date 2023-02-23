import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInterval, useTimeout } from 'react-timers-hooks';
import { useAlert } from 'react-styled-alert';
import { Typography } from '@mui/material';
import { useRequest, useToken, useLoading, useRoute } from 'hooks';
import { GameData } from 'types';

const EMPTY_GAME_DATA: GameData = {
  id: '',
  state: 'room',
  player1: 'waiting',
  player2: 'waiting',
  size: [0, 0],
  gameObjects: []
};

export function useGetSession() {
  const [game, setGame] = useState<GameData>({ ...EMPTY_GAME_DATA });
  const [player, setPlayer] = useState<1 | 2>(1);
  const [error, setError] = useState<string>('');
  const [reconnecting, setReconnecting] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [reconnectTimer, setReconnectTimer] = useState<number>(0);
  const { sessionId } = useParams();
  const alert = useAlert();
  const { token, setToken } = useToken();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { changeRoute } = useRoute();
  const { get } = useRequest<
    { game: GameData, player: 1 | 2 }
  >('/sessions');
  const { post } = useRequest<
    { token: string, player: 1 | 2 }
  >(`/sessions/connect/${sessionId}`);
  
  useEffect(() => {
    startLoading();
    post(
      {},
      (res) => {
        setToken(res.data.token);
        setPlayer(res.data.player);
        setTimer(200);
      },
      (err) => setError(err.message)
    );
  }, []);

  useInterval(() => {
    get(
      (res) => {
        if (isLoading()) stopLoading();
        setReconnecting(false);
        setReconnectTimer(0);
        setGame({ ...res.data.game });
        setPlayer(res.data.player);
        if (res.data.game.state === 'over') setTimer(0); 
      },
      () => {
        setReconnecting(true);
        setReconnectTimer(15000);
      },
      { headers: {
        Authorization: `Bearer ${token}`
      }}
    );
  }, timer ? timer : null);

  useTimeout(() => {
    changeRoute('/');
    alert(
      <Typography
        variant='body1'
        color='error'
        textAlign='center'
      >
        Connection failed
      </Typography>
    );
  }, reconnectTimer ? reconnectTimer : null);

  return [game, player, error, reconnecting] as [
    game: GameData,
    player: 1 | 2,
    error: string,
    reconnecting: boolean
  ];
}