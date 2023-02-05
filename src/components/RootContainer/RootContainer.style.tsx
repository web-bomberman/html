import styled from '@emotion/styled';
import { colors, fonts } from 'themes';

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

export const BottomText = styled.div`
  width: 100%;
  margin: 64px 0px 24px 0px;
  font-family: ${fonts.script};
  font-weight: 300;
  font-size: 12px;
  color: ${colors.halfContrast};
  text-align: center;
`;