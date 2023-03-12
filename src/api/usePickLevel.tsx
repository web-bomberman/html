import { useState, useEffect } from 'react';
import { useAlert } from 'react-styled-alert';
import { Typography } from '@mui/material';
import { useToken, useRequest } from 'hooks';
import { Level } from 'types';

export function usePickLevel(levels: Level[] | null, gameLevel: string) {
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [newLevel, setNewLevel] = useState<string>('');
  const alert = useAlert();
  const api = useRequest<Level>(`/sessions/pick-level/${newLevel}`);
  const { token } = useToken();

  const getLevel = (name: string) => {
    if (!levels) return undefined;
    return levels.find((level) => level.name === name);
  };

  const request = () => {
    api.post(
      {},
      (res) => {
        setNewLevel('');
        setCurrentLevel(res.data);
      },
      () => {
        setNewLevel('');
        alert(
          <Typography variant="body1" color="error" textAlign="center">
            Failed to select level
          </Typography>
        );
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  useEffect(() => {
    const level = getLevel(gameLevel);
    if (level) setCurrentLevel(level);
  }, [gameLevel, levels]);

  useEffect(() => {
    if (newLevel) request();
  }, [newLevel]);

  return [api.loading, setNewLevel, currentLevel] as [
    loading: boolean,
    pickLevel: (level: string) => void,
    level: Level | null
  ];
}
