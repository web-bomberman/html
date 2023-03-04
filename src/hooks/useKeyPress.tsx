import { useEffect } from 'react';

export function useKeyPress(keys: string[], callback: () => void) {
  const handler = (e: KeyboardEvent) => {
    if (keys.find((value) => value === e.key)) callback();
  };

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [])
}