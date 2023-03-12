import { useState } from 'react';
import { useInterval } from 'react-timers-hooks';
import { Typography } from '@mui/material';

export function Loading() {
  const [dots, setDots] = useState<string>('');

  useInterval(() => {
    setDots((prev) => {
      if (prev.length === 6) return '';
      return prev + '.';
    });
  }, 250);

  return (
    <Typography variant="body1" color="text.primary" sx={{ margin: '64px' }}>
      {`Loading${dots}`}
    </Typography>
  );
}
