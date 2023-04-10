import { useGetSession } from 'api';
import { useRoute } from 'hooks';
import { Container, SessionRoom, SessionGame } from 'components';
import { css } from '@emotion/react';
import { Typography, Button } from '@mui/material';

export function Session() {
  const [game, player, ping, error, reconnecting] = useGetSession();
  const { changeRoute } = useRoute();

  const sessionComp = {
    room: <SessionRoom player={player} game={game} />,
    starting: (
      <Typography variant="h3" color="text.primary" sx={{ marginTop: '180px' }}>
        Get Ready!
      </Typography>
    ),
    running: <SessionGame player={player} game={game} ping={ping} />,
    interrupted: <SessionGame player={player} game={game} ping={ping} />,
    'player1 won': <SessionGame player={player} game={game} ping={ping} />,
    'player2 won': <SessionGame player={player} game={game} ping={ping} />,
    draw: <SessionGame player={player} game={game} ping={ping} />,
  };

  if (error)
    return (
      <>
        <Typography variant="body1" color="error" sx={{ marginTop: '64px' }}>
          {error}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
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
      {reconnecting ? (
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
          <Container width="200px" bordered>
            <div
              css={css`
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
              `}
            >
              <Typography
                variant="body1"
                color="text.primary"
                textAlign="center"
              >
                Reconnecting...
              </Typography>
              <Button
                variant="outlined"
                color="error"
                sx={{ marginTop: '32px' }}
                onClick={() => changeRoute('/')}
              >
                Leave Game
              </Button>
            </div>
          </Container>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
