import React from 'react';
import { Typography } from '@mui/material';
import { css } from '@emotion/react';
import { colors } from 'themes';

export function RootContainer(props: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        position: absolute;
        height: 100vh;
        width: 100vw;
        padding-top: 64px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        background: ${colors.background};
        background-position: center;
        background-repeat: no-repeat;
      `}
    >
      <div
        css={css`
          width: 1024px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          @media (max-width: 1024px) {
            width: 100%;
          }
        `}
      >
        {props.children}
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