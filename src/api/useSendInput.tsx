import axios from 'axios';
import { useAlert } from 'react-styled-alert';
import { Typography } from '@mui/material';
import { useToken } from 'hooks';

export function useSendInput() {
  const alert = useAlert();
  const { token } = useToken();

  const API_URL: string = import.meta.env.VITE_API_URL as string;

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
    axios
      .post(
        API_URL + '/input/up',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(error);
  };

  const right = () => {
    axios
      .post(
        API_URL + '/input/right',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(error);
  };

  const down = () => {
    axios
      .post(
        API_URL + '/input/down',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(error);
  };

  const left = () => {
    axios
      .post(
        API_URL + '/input/left',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(error);
  };

  const bomb = () => {
    axios
      .post(
        API_URL + '/input/bomb',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(error);
  };

  return [up, right, down, left, bomb] as [
    up: () => void,
    right: () => void,
    down: () => void,
    left: () => void,
    bomb: () => void
  ];
}
