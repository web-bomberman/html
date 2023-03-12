import { useAlert } from 'react-styled-alert';
import { Typography } from '@mui/material';
import { useToken, useRequest } from 'hooks';

export function useSendInput() {
  const alert = useAlert();
  const { token } = useToken();
  const upApi = useRequest('/input/up');
  const rightApi = useRequest('/input/right');
  const downApi = useRequest('/input/down');
  const leftApi = useRequest('/input/left');
  const bombApi = useRequest('/input/bomb');

  const error = () => {
    alert(
      <Typography>
        <Typography variant="body1" color="error" textAlign="center">
          Input request failed
        </Typography>
      </Typography>
    );
  };

  const up = () => {
    upApi.post({}, () => {}, error, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const right = () => {
    rightApi.post({}, () => {}, error, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const down = () => {
    downApi.post({}, () => {}, error, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const left = () => {
    leftApi.post({}, () => {}, error, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const bomb = () => {
    bombApi.post({}, () => {}, error, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return [up, right, down, left, bomb] as [
    up: () => void,
    right: () => void,
    down: () => void,
    left: () => void,
    bomb: () => void
  ];
}
