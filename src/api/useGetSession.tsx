import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInterval } from 'react-timers-hooks';
import { useRequest, useToken, useLoading } from 'hooks';
import { GameData } from 'types';

export function useGetSession() {
  const [game, setGame] = useState<GameData | null>(null);
  const [error, setError] = useState<string>('');
  const [reconnecting, setReconnecting] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const { sessionId } = useParams();
  const { token, setToken } = useToken();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { get } = useRequest<GameData>(`/sessions/${sessionId}`);
  const { post } = useRequest<{ token: string}>(`/sessions/${sessionId}`);
  
  useEffect(() => {
    startLoading();
    post(
      {},
      (res) => {
        setToken(res.data.token);
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
        setGame(res.data);
        if (res.data.state === 'over') setTimer(0); 
      },
      () => setReconnecting(true),
      { headers: {
        Authorization: `Bearer ${token}`
      }}
    );
  }, timer ? timer : null);

  return [game, error, reconnecting] as [GameData | null, string, boolean];
}