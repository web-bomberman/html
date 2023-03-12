import { useAlert } from 'react-styled-alert';
import { Typography } from '@mui/material';
import { useRequest, useToken } from 'hooks';

export function useStartGame() {
  const alert = useAlert();
  const { token } = useToken();
  const api = useRequest(`/sessions/start-game`);

  const request = () => {
    api.post(
      {},
      () => {},
      (err) => {
        alert(
          <Typography variant="body1" color="error" textAlign="center">
            {err.message}
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

  return [api.loading, request] as [loading: boolean, request: () => void];
}
