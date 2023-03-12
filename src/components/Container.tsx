import React from 'react';
import { css } from '@emotion/react';
import { colors } from 'themes';
import { ContainerProps } from 'types';

export function Container(props: React.PropsWithChildren<ContainerProps>) {
  const { height, width, margin, bordered } = props;
  return (
    <div
      css={css`
        padding: 32px;
        border-radius: 8px;
        height: ${height ? height : 'fit-content'};
        width: ${width ? width : '800px'};
        margin: ${margin ? margin : 'none'};
        background-color: ${colors.background};
        border: ${bordered ? `solid 1px ${colors.halfPrimary}` : 'none'};
        @media (max-width: 800px) {
          width: 100%;
          border-radius: 0px;
          ${bordered &&
          css`
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
