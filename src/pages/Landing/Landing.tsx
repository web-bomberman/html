import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Typography, Button } from '@mui/material';

import { ButtonsContainer } from './Landing.style';

export function Landing() {
  return (
    <>
      <Helmet>
        <title>Web Bomberman</title>
      </Helmet>
      <Typography
        variant='h2'
        color='text.primary'
        sx={{ textAlign: 'center' }}
      >
        Web Bomberman
      </Typography>
      <Typography
        variant='body1'
        color='text.primary'
        sx={{ marginTop: '64px' }}
      >
        Welcome. This is the Web Bomberman project, where you can play
        bomberman on your browser with a friend.
      </Typography>
      <ButtonsContainer>
        <Button
          variant='outlined'
          size='large'
          sx={{ margin: '8px 0px' }}
        >
          Create Game
        </Button>
        <Button
          variant='outlined'
          size='large'
          sx={{ margin: '8px 0px' }}
        >
          Find Game
        </Button>
        <Button
          variant='outlined'
          size='large'
          component={Link}
          to='/credits'
          sx={{ margin: '8px 0px' }}
        >
          Credits
      </Button>
      </ButtonsContainer>
      
    </>
  );
}