import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { css } from '@emotion/react';
import { useObserve } from 'react-observer-implementation';
import { Loading } from 'components';
import { useLoading, useRoute } from 'hooks';
import { colors } from 'themes';

export function RootContainer(props: { children: React.ReactNode }) {
  const [transitioning, setTransitioning] = useState<boolean>(false);
  const { isLoading, stopLoading } = useLoading();
  const { route } = useRoute();

  useEffect(() => {
    if (route === '/' || route === '/credits') stopLoading();
  }, [route]);

  useObserve(
    'route_changing',
    () => setTransitioning(true)
  );

  useObserve(
    'route_changed',
    () => setTransitioning(false)
  )

  return (
    <div
      css={css`
        position: absolute;
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        overflow-x: hidden;
      `}
    >
      <div
        css={css`
          width: 1024px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: ${transitioning ? '0' : '1'};
          transform: ${transitioning ?
            'translateX(50%)' : 'translateX(0px)'};
          transition: transform 0.3s, opacity 0.3s;
          @media (max-width: 1024px) {
            width: 100%;
          }
        `}
      >
        {isLoading() ? <Loading /> : <></>}
        <div
          css={css`
            width: 100%;
            display: ${isLoading() ? 'none' : 'flex'};
            flex-direction: column;
            align-items: center;
          `}
        >
          {props.children}
        </div>
      </div>
      <Typography
        variant='body2'
        color='text.secondary'
        sx={{ margin: '64px 0px 24px 0px' }}
      >
        Web Bomberman - Rafael de Lima Bordoni, 2023
      </Typography>
    </div>
  );
}