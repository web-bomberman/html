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
    starting:
      <Typography
        variant='h3'
        color='text.primary'
        sx={{ marginTop: '64px' }}
      >
        Starting
      </Typography>,
    running:
      <Typography
        variant='h3'
        color='text.primary'
        sx={{ marginTop: '64px' }}
      >
        Running
      </Typography>,
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
      {sessionComp[game.state]}
      {reconnecting ? 
        <div
          css={css`
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            z-index: 5;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <Container width='200px' bordered>
            <div
              css={css`
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
              `}
            >
              <Typography
                variant='body1'
                color='text.primary'
                textAlign='center'
              >
                Reconnecting...
              </Typography>
              <Button
                variant='outlined'
                color='error'
                sx={{ marginTop: '32px' }}
                onClick={() => changeRoute('/')}
              >
                Leave Game
              </Button>
            </div>
          </Container>
        </div> :
        <></>
      }
    </>
  );
}