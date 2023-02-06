import styled from '@emotion/styled';
import { colors } from 'themes';

export const Container = styled.div`
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
`;

export const PageContainer = styled.div`
  width: 1000px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;