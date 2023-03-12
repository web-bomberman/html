import { useRef } from 'react';
import { useAlert } from 'react-styled-alert';
import { useRoute } from 'hooks';
import { useNewSession } from 'api';
import { Typography, Button, TextField } from '@mui/material';
import { css } from '@emotion/react';
import video from 'assets/video.mp4';

export function Landing() {
  const ref = useRef<HTMLInputElement>();
  const alert = useAlert();
  const { changeRoute } = useRoute();
  const newSession = useNewSession();

  const handleFindGame = () => {
    alert(
      <TextField
        id='find-game'
        label='Game session ID'
        type='text'
        variant='outlined'
        margin='normal'
        inputRef={ref}
        fullWidth
        autoFocus
        onKeyDown={(e) => {
          if (e.key !== 'Enter') return;
          const okButton = document.getElementById('alert-ok');
          okButton?.click();
        }}
      />,
      () => {
        if (ref.current) changeRoute(`/${ref.current.value}`);
      },
      () => {}
    );
  };

  return (
    <>
      <Typography
        variant='h2'
        color='text.primary'
        sx={{ textAlign: 'center', marginTop: '64px' }}
      >
        Web Bomberman
      </Typography>
      <video autoPlay loop muted playsInline css={css`
        width: 600px;
        margin: 32px 0;
        @media (max-width: 600px) {
          width: 100%;
        }
      `}>
        <source src={video} type='video/mp4'/>
      </video>
      <div
        css={css`
          width: 800px;
          margin-top: 64px;
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
          onClick={newSession}
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
          onClick={() => changeRoute('/credits')}
          sx={{ margin: '8px 0px' }}
        >
          Credits
        </Button>
      </div>
    </>
  );
}