import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useInterval, useTimeout } from 'react-timers-hooks';
import { useAlert } from 'react-styled-alert';
import { useNotify } from 'react-observer-implementation';
import { Typography } from '@mui/material';
import { useToken, useLoading, useRoute } from 'hooks';
import { GameData } from 'types';

const EMPTY_GAME_DATA: GameData = {
  id: '',
  state: 'room',
  player1: 'waiting',
  player2: 'waiting',
  size: [0, 0],
  level: 'Basic',
  gameObjects: {},
};

export function useGetSession() {
  const [game, setGame] = useState<GameData>({ ...EMPTY_GAME_DATA });
  const [player, setPlayer] = useState<1 | 2>(1);
  const [ping, setPing] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [reconnecting, setReconnecting] = useState<boolean>(false);
  const [tickTimer, setTickTimer] = useState<number>(0);
  const [checkConnection, setCheckConnection] = useState<number>(0);
  const [checkConnectionTime, setCheckConnectionTime] = useState<number>(0);
  const [reconnectTimer, setReconnectTimer] = useState<number>(0);
  const { sessionId } = useParams();
  const alert = useAlert();
  const notifyDisconnected = useNotify('disconnected');
  const { token, setToken } = useToken();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { changeRoute } = useRoute();

  const API_URL: string = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    startLoading();
    axios
      .post(API_URL + `/sessions/connect/${sessionId}`)
      .then((res) => {
        setToken(res.data.token);
        setPlayer(res.data.player);
        setTickTimer(200);
        setCheckConnection(1000);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Get duration time for GET /sessions route only
  axios.interceptors.response.use((res) => {
    const startTime = res.config.headers['request-startTime'];
    if (startTime) {
      res.headers['request-duration'] = new Date().getTime() - startTime;
    }
    return res;
  });

  useInterval(
    () => {
      axios
        .get(API_URL + '/sessions', {
          headers: {
            Authorization: `Bearer ${token}`,
            'request-startTime': new Date().getTime(),
          },
        })
        .then((res) => {
          if (isLoading()) stopLoading();
          setReconnecting(false);
          setReconnectTimer(0);
          setCheckConnectionTime(0);
          setGame({ ...res.data.game });
          setPlayer(res.data.player);
          setPing(res.headers['request-duration']);
          if (
            // When you're player 2 and player 1 leaves, take player 1
            res.data.player === 2 &&
            res.data.game.player1 === 'waiting'
          ) {
            startLoading();
            setTickTimer(0);
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
                axios
                  .post(API_URL + `/sessions/connect/${sessionId}`)
                  .then((res) => {
                    setToken(res.data.token);
                    setPlayer(res.data.player);
                    setTickTimer(200);
                    setCheckConnection(1000);
                    alert(
                      <Typography
                        variant="body1"
                        color="primary"
                        textAlign="center"
                      >
                        Player 1 disconnected,
                        <br />
                        {"you're player 1 now"}
                      </Typography>
                    );
                  })
                  .catch(() => {
                    changeRoute('/');
                    alert(
                      <Typography
                        variant="body1"
                        color="error"
                        textAlign="center"
                      >
                        Connection failed
                      </Typography>
                    );
                  });
              })
              .catch(() => {
                changeRoute('/');
                alert(
                  <Typography variant="body1" color="error" textAlign="center">
                    Connection failed
                  </Typography>
                );
              });
          } else if (res.data.game.state === 'interrupted') setTickTimer(0);
          else if (res.data.game.state === 'player1 won') setTickTimer(0);
          else if (res.data.game.state === 'player2 won') setTickTimer(0);
          else if (res.data.game.state === 'draw') setTickTimer(0);
        })
        .catch((err) => {
          if (err.message !== 'Session over') {
            setReconnecting(true);
            notifyDisconnected();
            setReconnectTimer(10000);
          }
        });
    },
    tickTimer ? tickTimer : null
  );

  useInterval(
    () => {
      setCheckConnectionTime((prev) => prev + 1);
      if (checkConnectionTime >= 3 && tickTimer !== 0) {
        setReconnecting(true);
        notifyDisconnected();
      }
    },
    checkConnection ? checkConnection : null
  );

  useTimeout(
    () => {
      changeRoute('/');
      alert(
        <Typography variant="body1" color="error" textAlign="center">
          Connection failed
        </Typography>
      );
    },
    reconnectTimer ? reconnectTimer : null
  );

  return [game, player, ping, error, reconnecting] as [
    game: GameData,
    player: 1 | 2,
    ping: number,
    error: string,
    reconnecting: boolean
  ];
}
