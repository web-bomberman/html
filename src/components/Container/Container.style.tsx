import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ContainerProps } from 'types';

export const ContainerStyle = styled.div<ContainerProps>`
  padding: 32px;
  border-radius: 8px;
  height: ${(props) => props.height ?
    props.height : 'fit-content'
  };
  width: ${(props) => props.width ?
    props.width : '800px'
  };
  margin: ${(props) => props.margin ? 
    props.margin : 'none'
  };
  background-color: ${(props) => (props.noBackground ?
     'transparent' : 'rgba(255, 255, 255, 0.1)'
  )};
  border: ${(props) => (props.bordered ?
    '1px solid rgba(255, 255, 255, 0.3);' : 'none'
  )};
  backdrop-filter: ${(props) => (props.blur ?
    `blur(${props.blur})` : 'none'
  )};

  @media (max-width: 800px) {
    width: 100%;
    border-radius: 0px;
    ${(props) => (
      props.bordered && css`
        border-left: none;
        border-right: none;
      `
    )};
  }

  ${(props) => (
    props.extra && css`${props.extra}`
  )};
`;