import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-styled-alert';
import { css } from '@emotion/react';
import { Typography, Button } from '@mui/material';

export function Session() {
  return (
    <>
      <Typography
        variant='h2'
        color='text.primary'
        sx={{ marginTop: '64px' }}
      >
        Game Session
      </Typography>
    </>
  );
}