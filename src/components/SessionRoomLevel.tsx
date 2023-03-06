import { css } from '@emotion/react';
import { colors } from 'themes';
import { Level } from 'types';
import player1 from 'assets/player1.gif';
import player2 from 'assets/player2.gif';
import destructible from 'assets/destructible.png';
import indestructible from 'assets/indestructible.png';

export function SessionRoomLevel(props: { level: Level }) {
  const { size, objects } = props.level;
  const images = {
    player1,
    player2,
    destructible,
    indestructible
  };

  return (
    <div css={css`
      width: 624px;
      margin-bottom: 64px;
      box-sizing: content-box;
      border: 4px solid ${colors.halfPrimary};
      display: grid;
      grid-template-columns: repeat(${size[0]}, 1fr);
      grid-template-rows: repeat(${size[1]}, 1fr);
      @media (max-width: 624px) {
        width: 100%;
        border-right: none;
        border-left: none;
      }
    `}
    >
      {objects.map((value, index) => (
        <img
          key={index}
          src={images[value.object]}
          css={css`
            width: 100%;
            aspect-ratio: 1;
            image-rendering: pixelated;
            grid-column: ${value.position[0]};
            grid-row: ${value.position[1]};
          `}
        />
      ))}
    </div>
  );
}