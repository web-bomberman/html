import { useState, useEffect } from 'react';
import { useTimeout } from 'react-timers-hooks';
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import { colors } from 'themes';

export function SessionGamePowerUps(
  props: {
    bombQuantity: number,
    bombRadius: number,
    armor: boolean,
    nitro: boolean
  }
) {
  const { bombQuantity, bombRadius, armor, nitro } = props;
  const [popup, setPopup] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (!ready) return;
    setPopup('Bomb quantity increased!');
    if (timer !== 5000) setTimer(5000);
    else setTimer(5001);
  }, [bombQuantity]);

  useEffect(() => {
    if (!ready) return;
    setPopup('Bomb blast radius increased!');
    if (timer !== 5000) setTimer(5000);
    else setTimer(5001);
  }, [bombRadius]);

  useEffect(() => {
    if (!ready) return;
    if (armor) setPopup('Acquired protective armor!');
    else setPopup('Protective armor lost!')
    if (timer !== 5000) setTimer(5000);
    else setTimer(5001);
  }, [armor]);

  useEffect(() => {
    if (!ready) return;
    setPopup('Acquired nitro bombs!');
    if (timer !== 5000) setTimer(5000);
    else setTimer(5001);
  }, [nitro]);

  useTimeout(() => {
    setTimer(0);
    setPopup('');
  }, timer ? timer : null);

  useTimeout(() => setReady(true), 100);

  const getArmorAndNitroDisplay = () => {
    if (armor && nitro) return 'Nitro bombs, protective armor';
    else if (armor && !nitro) return 'Protective armor';
    else if (!armor && nitro) return 'Nitro bombs';
    else return '';
  }

  return (
    <div css={css`
      position: relative;
      width: 100%;
      margin-top: 64px;
    `}
    >
      <Typography variant='body1' color='text.primary'>
        {`Blast radius: ${bombRadius}, bomb quantity: ${bombQuantity}`}
      </Typography>
      <Typography variant='body1' color='text.primary'>
        {getArmorAndNitroDisplay()}
      </Typography>
      {popup ? (
        <div css={css`
          position: absolute;
          top: -96px;
          left: 0px;
          right: 0px;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: center;
        `}>
          <div css={css`
            padding: 16px;
            border-radius: 8px;
            border: solid 1px ${colors.halfPrimary};
            background-color: ${colors.background};
          `}>
            <Typography variant='body1' color='text.primary'>
              {popup}
            </Typography>
          </div>
        </div>
      ) : <></>}
    </div>
  );
}