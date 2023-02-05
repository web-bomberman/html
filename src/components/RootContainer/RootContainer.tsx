import React from 'react';
import {
  Container,
  PageContainer,
  BottomText
} from './RootContainer.style';

export function RootContainer(props: { children: React.ReactNode }) {
  return (
    <Container>
      <PageContainer>
        {props.children}
      </PageContainer>
      <BottomText>
        Web Bomberman - Rafael de Lima Bordoni, 2023
      </BottomText>
    </Container>
  );
}