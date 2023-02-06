import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAlert } from 'react-styled-alert';
import { Typography, Button, TextField } from '@mui/material';
import { css } from '@emotion/react';

export function Landing() {
  const inputRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const alert = useAlert();

  const handleFindGame = () => {
    alert(
      <TextField
        id='find-game'
        label='Game session ID'
        type='text'
        variant='outlined'
        margin='normal'
        inputRef={inputRef}
        fullWidth
        autoFocus
      />,
      () => {
        if (inputRef.current) navigate(`/session/${inputRef.current.value}`);
      },
      () => {}
    );
  };

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
      <div
        css={css`
          width: 800px;
          margin-top: 128px;
          display: flex;
          justify-content: space-between;
          padding: 0px 32px;
          @media (max-width: 800px) {
            width: 100%;
            flex-direction: column;
          }
        `}
      >
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
          onClick={handleFindGame}
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
      </div>
    </>
  );
}