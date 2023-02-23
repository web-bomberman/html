import { css } from '@emotion/react';
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
    indestructible,
    bomb: ''
  };

  return (
    <div css={css`
      width: 100%;
      margin: 32px 0px;
      display: grid;
      grid-template-columns: repeat(${size[0]}, 1fr);
      grid-template-rows: repeat(${size[1]}, 1fr);
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