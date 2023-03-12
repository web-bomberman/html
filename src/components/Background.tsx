import { useState } from 'react';
import { useTimeout } from 'react-timers-hooks';
import { css } from '@emotion/react';
import { useMouseClick } from 'hooks';
import { colors } from 'themes';
import background from 'assets/background.png';

export function Background() {
  const [timer, setTimer] = useState<number>(0);

  useMouseClick((x: number, y: number) => {
    document.documentElement.style.setProperty('--mouse-x', String(x) + 'px');
    document.documentElement.style.setProperty('--mouse-y', String(y) + 'px');
    setTimer(500);
  });

  useTimeout(
    () => {
      setTimer(0);
    },
    timer ? timer : null
  );

  return (
    <div
      css={css`
        position: absolute;
        height: 100vh;
        width: 100vw;
        z-index: -1;
        background-color: ${colors.background};
      `}
    >
      <div
        css={css`
          position: absolute;
          height: 100vh;
          width: 100vw;
          background-image: url(${background});
          background-size: 1024px;
          background-repeat: repeat;
          mask-image: linear-gradient(
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.1) 25%,
            rgba(0, 0, 0, 0) 50%
          );
          mask-repeat: no-repeat;
          animation-name: waveAnimation;
          animation-duration: 10s;
          animation-iteration-count: infinite;

          @keyframes waveAnimation {
            from {
              mask-position: 0% -50vh;
            }
            to {
              mask-position: 0% 100vh;
            }
          }
        `}
      />
      {timer ? (
        <div
          css={css`
            position: absolute;
            height: 100vh;
            width: 100vw;
            background-image: url(${background});
            background-size: 1024px;
            background-repeat: repeat;
            mask-image: radial-gradient(
              circle,
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0) 30%
            );
            mask-repeat: no-repeat;
            animation-name: rippleAnimation;
            animation-duration: 0.5s;

            @keyframes rippleAnimation {
              from {
                mask-size: 0 0;
                opacity: 1;
                mask-position: var(--mouse-x) var(--mouse-y);
              }
              to {
                mask-size: 200% 200%;
                opacity: 0;
                mask-position: calc(var(--mouse-x) - 100vw)
                  calc(var(--mouse-y) - 100vh);
              }
            }
          `}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
