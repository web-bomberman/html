import React from 'react';
import { ContainerProps } from 'types';
import { ContainerStyle } from './Container.style';

export function Container(props: React.PropsWithChildren<ContainerProps>) {
  return (
    <ContainerStyle
      bordered={props.bordered}
      noBackground={props.noBackground}
      blur={props.blur}
      margin={props.margin}
      width={props.width}
      height={props.height}
      extra={props.extra}
    >
      {props.children}
    </ContainerStyle>
  );
}