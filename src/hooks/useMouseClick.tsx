import { useEffect } from 'react';

export function useMouseClick(callback: (x: number, y: number) => void) {
  const handler = (e: MouseEvent) => {
    callback(e.clientX, e.clientY);
  };

  useEffect(() => {
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);
}
