import { useState, useEffect } from 'react';
import { useAlert } from 'react-styled-alert';
import { Typography, Button, useMediaQuery } from '@mui/material';
import { css } from '@emotion/react';
import { useLeaveGame, useSendInput } from 'api';
import { useKeyPress } from 'hooks';
import { GameData } from 'types';
import LeftArrow from 'assets/arrow-left.svg';
import RightArrow from 'assets/arrow-right.svg';
import UpArrow from 'assets/arrow-up.svg';
import DownArrow from 'assets/arrow-down.svg';
import Bomb from 'assets/bomb.svg';

import { Container, SessionGameScreen, SessionGamePowerUps } from 'components';

export function SessionGame(props: {
  player: 1 | 2;
  game: GameData;
  ping: number;
}) {
  const { player, game } = props;
  const [popup, setPopup] = useState<string>('');
  const alert = useAlert();
  const mediaQuery = useMediaQuery('(max-width: 1024px');
  const screenSize = useMediaQuery('(max-width: 624px)');
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
        <Typography variant="body1" color="text.primary" textAlign="center">
          Player 1 wins!
        </Typography>,
        () => leave()
      );
    } else if (game.state === 'player2 won') {
      setPopup('');
      alert(
        <Typography variant="body1" color="text.primary" textAlign="center">
          Player 2 wins!
        </Typography>,
        () => leave()
      );
    } else if (game.state === 'draw') {
      setPopup('');
      alert(
        <Typography variant="body1" color="text.primary" textAlign="center">
          Draw!
        </Typography>,
        () => leave()
      );
    } else if (
      (player === 1 && game.player2 === 'reconnecting') ||
      (player === 2 && game.player1 === 'reconnecting')
    )
      setPopup(`Checking opponent's connection...`);
    else if (
      game.player1 === 'disconnected' ||
      game.player2 === 'disconnected'
    ) {
      setPopup('');
      alert(
        <Typography variant="body1" color="text.primary" textAlign="center">
          Opponent disconnected.
        </Typography>,
        () => leave()
      );
    } else setPopup('');
  }, [game.player1, game.player2, game.state]);

  const getWinner = () => {
    switch (game.state) {
      case 'player1 won':
        return 1;
      case 'player2 won':
        return 2;
      case 'draw':
        return 'draw';
      default:
        return null;
    }
  };

  const powerUps = (() => {
    let extras: string[] = [];
    for (const obj of Object.values(game.gameObjects)) {
      if (obj.type === 'player1' && player === 1) {
        extras = [
          obj.extras[0].replace('bomb-radius: ', ''),
          obj.extras[1].replace('bomb-quantity: ', ''),
          obj.extras[2].replace('nitro-bombs: ', ''),
          obj.extras[3].replace('protective-armor: ', ''),
        ];
        break;
      }
      if (obj.type === 'player2' && player === 2) {
        extras = [
          obj.extras[0].replace('bomb-radius: ', ''),
          obj.extras[1].replace('bomb-quantity: ', ''),
          obj.extras[2].replace('nitro-bombs: ', ''),
          obj.extras[3].replace('protective-armor: ', ''),
        ];
        break;
      }
    }
    if (extras.length === 4) {
      return {
        bombRadius: Number(extras[0]),
        bombQuantity: Number(extras[1]),
        nitro: extras[2] === 'true' ? true : false,
        armor: extras[3] === 'true' ? true : false,
      };
    } else
      return {
        bombRadius: 0,
        bombQuantity: 0,
        armor: false,
        nitro: false,
      };
  })();

  const handleLeave = () => {
    alert(
      <Typography variant="body1" color="text.primary" textAlign="center">
        Disconnect and leave the game?
        <br />
        {"You can't come back."}
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
      <Typography
        variant="body1"
        color="text.primary"
        align="right"
        sx={{ width: screenSize ? '100%' : '624px' }}
      >
        {`Ping: ${props.ping}ms`}
      </Typography>
      <SessionGameScreen
        objects={game.gameObjects}
        size={game.size}
        winner={getWinner()}
      />
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <SessionGamePowerUps
          bombQuantity={powerUps.bombQuantity}
          bombRadius={powerUps.bombRadius}
          armor={powerUps.armor}
          nitro={powerUps.nitro}
        />
        {mediaQuery ? (
          <div
            css={css`
              width: 512px;
              display: grid;
              padding: 32px;
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: repeat(3, 1fr);
              column-gap: 32px;
              row-gap: 32px;
              @media (max-width: 512px) {
                width: 100%;
              }
            `}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={upApi}
              sx={{
                width: '100%',
                height: '100%',
                gridColumn: 2,
                gridRow: 1,
              }}
            >
              <img src={UpArrow} />
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={downApi}
              sx={{
                width: '100%',
                height: '100%',
                gridColumn: 2,
                gridRow: 3,
              }}
            >
              <img src={DownArrow} />
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={leftApi}
              sx={{
                width: '100%',
                height: '100%',
                gridColumn: 1,
                gridRow: 2,
              }}
            >
              <img src={LeftArrow} />
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={rightApi}
              sx={{
                width: '100%',
                height: '100%',
                gridColumn: 3,
                gridRow: 2,
              }}
            >
              <img src={RightArrow} />
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={bombApi}
              sx={{
                width: '100%',
                height: '100%',
                gridColumn: 2,
                gridRow: 2,
              }}
            >
              <img src={Bomb} />
            </Button>
          </div>
        ) : (
          <Typography
            variant="body1"
            color="text.primary"
            fontSize="large"
            sx={{ marginTop: '32px' }}
          >
            WASD/Arrows: move
            <br />
            Space/Enter: bomb
          </Typography>
        )}
        <Button
          variant="outlined"
          color="primary"
          disabled={loadingLeave}
          onClick={handleLeave}
          sx={{ marginTop: '16px' }}
        >
          Leave Game
        </Button>
      </div>
      {popup ? (
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
                {popup}
              </Typography>
            </div>
          </Container>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
