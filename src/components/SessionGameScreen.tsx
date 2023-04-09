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

export function SessionGameScreen(props: {
  objects: { [id: string]: GameObject };
  size: Vector;
  winner: 'draw' | 1 | 2 | null;
}) {
  const { size, objects } = props;

  const getSprite = (type: string, extras: string[]) => {
    switch (type) {
      case 'player1':
        return player1;
      case 'player2':
        return player2;
      case 'destructible':
        return destructible;
      case 'indestructible':
        return indestructible;
      case 'powerup-bombs':
        return plusBombs;
      case 'powerup-radius':
        return plusRadius;
      case 'powerup-armor':
        return plusArmor;
      case 'powerup-nitro':
        return plusNitro;
      case 'bomb':
        return bomb;
      case 'explosion': {
        switch (extras[0]) {
          case 'center':
            return explosionCenter;
          case 'horizontal':
            return explosionMid;
          case 'vertical':
            return explosionMid;
          case 'up-end':
            return explosionEnd;
          case 'right-end':
            return explosionEnd;
          case 'down-end':
            return explosionEnd;
          case 'left-end':
            return explosionEnd;
          default:
            return '';
        }
      }
      default:
        return '';
    }
  };

  const getRotation = (type: string, extras: string[]) => {
    if (type !== 'explosion') return 'rotate(0deg)';
    else {
      switch (extras[0]) {
        case 'horizontal':
          return 'rotate(90deg)';
        case 'vertical':
          return 'rotate(0deg)';
        case 'up-end':
          return 'rotate(0deg)';
        case 'right-end':
          return 'rotate(90deg)';
        case 'down-end':
          return 'rotate(180deg)';
        case 'left-end':
          return 'rotate(270deg)';
        default:
          return 'rotate(0deg)';
      }
    }
  };

  const getZIndex = (type: string) => {
    switch (type) {
      case 'powerup-bombs':
        return 0;
      case 'powerup-radius':
        return 0;
      case 'powerup-armor':
        return 0;
      case 'powerup-nitro':
        return 0;
      case 'bomb':
        return 1;
      case 'player1':
        return 2;
      case 'player2':
        return 2;
      case 'explosion':
        return 3;
      case 'destructible':
        return 4;
      case 'indestructible':
        return 4;
    }
  };

  const getOpacity = (type: string) => {
    if (type === 'player1' && props.winner === 2) return '0';
    else if (type === 'player2' && props.winner === 1) return '0';
    else if (props.winner === 'draw') return '0';
    else return '1';
  };

  return (
    <div
      css={css`
        width: 624px;
        box-sizing: content-box;
        border: 4px solid ${colors.halfPrimary};
        background-color: ${colors.background};
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
      {Object.entries(objects).map(([id, obj]) => (
        <img
          key={id}
          src={getSprite(obj.type, obj.extras)}
          css={css`
            width: 100%;
            aspect-ratio: 1;
            z-index: ${getZIndex(obj.type)};
            opacity: ${getOpacity(obj.type)};
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
