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
import plusBombs from 'assets/powerup-bombs.png';
import plusRadius from 'assets/powerup-radius.png';
import plusArmor from 'assets/powerup-armor.png';
import plusNitro from 'assets/powerup-nitro.png';

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
        switch (extras[0]) {
          case 'center': return explosionCenter;
          case 'horizontal': return explosionMid;
          case 'vertical': return explosionMid;
          case 'up-end': return explosionEnd;
          case 'right-end': return explosionEnd;
          case 'down-end': return explosionEnd;
          case 'left-end': return explosionEnd;
          default: return '';
        }
      }
      default: return '';
    }
  };

  const getRotation = (type: string, extras: string[]) => {
    if (type !== 'explosion') return 'rotate(0deg)';
    else {
      switch (extras[0]) {
        case 'horizontal': return 'rotate(90deg)';
        case 'vertical': return 'rotate(0deg)';
        case 'up-end': return 'rotate(0deg)';
        case 'right-end': return 'rotate(90deg)';
        case 'down-end': return 'rotate(180deg)';
        case 'left-end': return 'rotate(270deg)';
        default: return 'rotate(0deg)';
      }
    }
  };

  const getZIndex = (type: string) => {
    switch (type) {
      case 'bomb': return 0;
      case 'player1': return 1;
      case 'player2': return 1;
      case 'explosion': return 2;
      case 'destructible': return 3;
      case 'indestructible': return 3;
    }
  }

  const getOpacity = (type: string, extras: string[]) => {
    if (type === 'player' && extras.length === 5) return '1';
    else return '1'
  };

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
            z-index: ${getZIndex(obj.type)};
            opacity: ${getOpacity(obj.type, obj.extras)};
            image-rendering: pixelated;
            grid-column: ${obj.position[0]};
            grid-row: ${size[1] - obj.position[1] + 1};
            transform: ${getRotation(obj.type, obj.extras)};
          `}
        />
      ))}
    </div>
  );
}