import React from 'react';
import { css } from '@emotion/react';
import { ContainerProps } from 'types';

export function Container(props: React.PropsWithChildren<ContainerProps>) {
  const {
    height,
    width,
    margin,
    noBackground,
    bordered,
    blur
  } = props;
  return (
    <div
      css={css`
        padding: 32px;
        border-radius: 8px;
        height: ${height ? height : 'fit-content'};
        width: ${width ? width : '800px'};
        margin: ${margin ? margin : 'none'};
        background-color: ${noBackground ? 'transparent' : '#ffffff10'};
        border: ${bordered ? 'solid 1px #ffffff30' : 'none'};
        backdrop-filter: ${blur ? `blur(${blur})` : 'none'};
        @media (max-width: 800px) {
          width: 100%;
          border-radius: 0px;
          ${bordered && css`
            border-left: 'none';
            border-right: 'none';
          `}
        }
      `}
    >
      {props.children}
    </div>
  );
}