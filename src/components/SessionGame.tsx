import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-styled-alert';
import { Typography, Button } from '@mui/material';
import { css } from '@emotion/react';
import { useLeaveGame, useSendInput } from 'api';
import { useKeyPress } from 'hooks';
import { Container, SessionGameScreen } from 'components';
import { GameData } from 'types';

export function SessionGame(props: { player: 1 | 2, game: GameData }) {
  const { player, game } = props;
  const [popup, setPopup] = useState<string>('');
  const alert = useAlert();
  const [loadingLeave, leave] = useLeaveGame();
  const [upApi, rightApi, downApi, leftApi, bombApi] = useSendInput();

  useKeyPress(['w', 'ArrowUp'], upApi);
  useKeyPress(['d', 'ArrowRight'], rightApi);
  useKeyPress(['s', 'ArrowDown'], downApi);
  useKeyPress(['a', 'ArrowLeft'], leftApi);
  useKeyPress(['Enter', ' '], bombApi);

  useEffect(() => {
    if (game.state === 'player1 won') {
      setPopup('');
      alert(
        <Typography
          variant='body1'
          color='text.primary'
          textAlign='center'
        >
          Player 1 wins!
        </Typography>,
        () => leave()
      );
    } else if (game.state === 'player2 won') {
      setPopup('');
      alert(
        <Typography
          variant='body1'
          color='text.primary'
          textAlign='center'
        >
          Player 2 wins!
        </Typography>,
        () => leave()
      );
    } else if (
      (player === 1 && game.player2 === 'reconnecting') ||
      (player === 2 && game.player1 === 'reconnecting')
    ) setPopup(`Checking opponent's connection...`);
    else if (
      game.player1 === 'disconnected' || game.player2 === 'disconnected'
    ) {
      setPopup('');
      alert(
        <Typography
          variant='body1'
          color='text.primary'
          textAlign='center'
        >
          Opponent disconnected.
        </Typography>,
        () => leave()
      );
    } else setPopup('');
  }, [game.player1, game.player2, game.state]);

  const handleLeave = () => {
    alert(
      <Typography
        variant='body1'
        color='text.primary'
        textAlign='center'
      >
        Disconnect and leave the game?<br/>
        You can't come back.
      </Typography>,
      () => leave(),
      () => {}
    );
  };

  return (
    <div
      css={css`
        width: 100%;
        padding-top: 64px;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <SessionGameScreen
        objects={game.gameObjects}
        size={game.size}
      />
      <div css={css`
        margin-top: 64px;
        display: flex;
        @media (max-width: 1024px) {
          flex-direction: column;
        }
      `}
      >
        <Typography
          variant='body1'
          color='text.primary'
          fontSize='large'
        >
          WASD/Arrows: move<br/>
          Space/Enter: bomb
        </Typography>
        <Button
          variant='outlined'
          color='primary'
          disabled={loadingLeave}
          onClick={handleLeave}
          sx={{ marginTop: '16px' }}
        >
          Leave Game
        </Button>
      </div>
      {popup ? 
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
                {popup}
              </Typography>
            </div>
          </Container>
        </div>
        : <></>
      }
    </div>
  );
}