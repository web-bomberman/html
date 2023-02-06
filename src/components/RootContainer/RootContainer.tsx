import React from 'react';
import { Typography } from '@mui/material';
import {
  Container,
  PageContainer
} from './RootContainer.style';

export function RootContainer(props: { children: React.ReactNode }) {
  return (
    <Container>
      <PageContainer>
        {props.children}
      </PageContainer>
      <Typography
        variant='body2'
        color='text.secondary'
        sx={{ margin: '64px 0px 24px 0px' }}
      >
        Web Bomberman - Rafael de Lima Bordoni, 2023
      </Typography>
    </Container>
  );
}