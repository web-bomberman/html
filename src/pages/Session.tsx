import { useGetSession } from 'api';
import { useRoute } from 'hooks';
import { Container, SessionRoom } from 'components';
import { css } from '@emotion/react';
import { Typography, Button } from '@mui/material';

export function Session() {
  const [game, player, error, reconnecting] = useGetSession();
  const { changeRoute } = useRoute();

  const sessionComp = {
    room: <SessionRoom player={player} game={game} />,
    starting: <></>,
    running: <></>,
    paused: <></>,
    over: <></>
  };

  if (error) return (
    <>
      <Typography
        variant='body1'
        color='error'
        sx={{ marginTop: '64px' }}
      >
        {error}
      </Typography>
      <Button
        variant='outlined'
        color='primary'
        sx={{ marginTop: '128px' }}
        onClick={() => changeRoute('/')}
      >
        Go Back
      </Button>
    </>
  );

  return (
    <>
      <Typography
        variant='h2'
        color='text.primary'
        sx={{ marginTop: '64px' }}
      >
        Game Session
      </Typography>
      {sessionComp[game.state]}
      { reconnecting ? 
        <div
          css={css`
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            z-index: 5;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <Container blur='3px' bordered>
            <Typography variant='body1' color='text.primary'>
              Reconnecting...
            </Typography>
          </Container>
        </div> :
        <></>
      }
    </>
  );
}