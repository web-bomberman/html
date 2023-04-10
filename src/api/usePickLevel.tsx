import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from 'react-styled-alert';
import { Typography } from '@mui/material';
import { useToken } from 'hooks';
import { Level } from 'types';

export function usePickLevel(levels: Level[] | null, gameLevel: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [newLevel, setNewLevel] = useState<string>('');
  const alert = useAlert();
  const { token } = useToken();

  const API_URL: string = import.meta.env.VITE_API_URL as string;

  const getLevel = (name: string) => {
    if (!levels) return undefined;
    return levels.find((level) => level.name === name);
  };

  const request = () => {
    setLoading(true);
    axios
      .post(
        API_URL + `/sessions/pick-level/${newLevel}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setNewLevel('');
        setCurrentLevel(res.data);
      })
      .catch(() => {
        setLoading(false);
        setNewLevel('');
        alert(
          <Typography variant="body1" color="error" textAlign="center">
            Failed to select level
          </Typography>
        );
      });
  };

  useEffect(() => {
    const level = getLevel(gameLevel);
    if (level) setCurrentLevel(level);
  }, [gameLevel, levels]);

  useEffect(() => {
    if (newLevel) request();
  }, [newLevel]);

  return [loading, setNewLevel, currentLevel] as [
    loading: boolean,
    pickLevel: (level: string) => void,
    level: Level | null
  ];
}
