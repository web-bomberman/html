import { css } from '@emotion/react';
import { colors } from 'themes';
import { GameObject, Vector } from 'types';
import player1 from 'assets/player1.gif';
import player2 from 'assets/player2.gif';
import destructible from 'assets/destructible.png';
import indestructible from 'assets/indestructible.png';
import bomb from 'assets/bomb.gif';
import explosionCenter from 'assets/explosion-center.gif';
import explosionMid from 'assets/explosion-mid.gif';
import explosionEnd from 'assets/explosion-end.gif';

export function SessionGameScreen(
  props: { objects: GameObject[], size: Vector }
) {
  const { size, objects } = props;

  const getSprite = (type: string, extras: string[]) => {
    switch (type) {
      case 'player1': return player1;
      case 'player2': return player2;
      case 'destructible': return destructible;
      case 'indestructible':  return indestructible;
      case 'bomb': return bomb;
      case 'explosion': {
        if (extras[0] === 'center') return explosionCenter;
        if (extras[0] === 'mid') return explosionMid;
        if (extras[0] === 'end') return explosionEnd;
      }
      default: return '';
    }
  }

  return (
    <div css={css`
      width: 100%;
      margin-bottom: 64px;
      border: 4px solid ${colors.halfPrimary};
      display: grid;
      grid-template-columns: repeat(${size[0]}, 1fr);
      grid-template-rows: repeat(${size[1]}, 1fr);
      @media (max-width: 1024px) {
        border-right: none;
        border-left: none;
      }
    `}
    >
      {objects.map((obj) => (
        <img
          key={obj.id}
          src={getSprite(obj.type, obj.extras)}
          css={css`
            width: 100%;
            aspect-ratio: 1;
            image-rendering: pixelated;
            grid-column: ${obj.position[0]};
            grid-row: ${size[1] - obj.position[1] + 1};
          `}
        />
      ))}
    </div>
  );
}