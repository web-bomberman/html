import { Button, Typography } from '@mui/material';
import { CheckBoxOutlined, CheckBoxOutlineBlank } from '@mui/icons-material';
import { css } from '@emotion/react';
import { useSetReady } from 'api';
import { useRoute } from 'hooks';
import { colors } from 'themes';
import { PlayerState } from 'types';
import Player1 from 'assets/player1.gif';
import Player2 from 'assets/player2.gif';

export function SessionRoomPlayer(props: {
  variant: 1 | 2,
  player: 1 | 2,
  player1State: PlayerState,
  player2State: PlayerState
}) {
  const [loading, ready, handleReady] = useSetReady();
  const { changeRoute } = useRoute();

  const colorString = props.variant === 1 ? 'secondary' : 'error';
  const color = props.variant === 1 ? colors.secondary : colors.error;
  const image = props.variant === 1 ? Player1 : Player2;
  const message = {
    'waiting': 'Empty...',
    'not ready': 'Not ready',
    'ready': 'Ready!',
    'reconnecting': 'Reconnecting...',
    'connected': 'Ready!',
    'disconnected': 'Empty...'
  }[{
    1: props.player1State,
    2: props.player2State
  }[props.variant]];

  return (
    <div css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}>
    <Typography variant='body1' color={color}>
        {`Player ${props.variant}`}
      </Typography>
      <img
        src={image}
        css={css`
          width: 64px;
          margin: 16px 0px;
          image-rendering: pixelated;
          opacity: ${message === 'Empty...' ? '0.3' : '1.0'};
        `}
      />
      {props.player === props.variant ? (
        <>
          <Typography variant='body1' color={color} sx={{ marginTop: '16px' }}>
            YOU
          </Typography>
          <Button
            variant='contained'
            color={colorString}
            startIcon={ready ? <CheckBoxOutlined /> : <CheckBoxOutlineBlank />}
            disabled={loading}
            onClick={handleReady}
            sx={{ marginTop: '16px' }}
          >
            {ready ? 'Ready!' : 'Ready?'}
          </Button>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => changeRoute('/')}
            sx={{ marginTop: '16px' }}
          >
            Leave Game
          </Button>
        </>
      ) : 
        <Typography variant='body1' color={color} sx={{ marginTop: '16px' }}>
          {message}
        </Typography>
      }
    </div>
  );
}