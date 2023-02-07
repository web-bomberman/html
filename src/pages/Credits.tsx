import { Helmet } from 'react-helmet';
import { css } from '@emotion/react';
import { Typography, Button } from '@mui/material';
import { useRoute } from 'hooks';
import { colors } from 'themes';

export function Credits() {
  const { changeRoute } = useRoute();

  const Anchor = (props: { url: string, text: string }) => {
    return (
      <a
        href={props.url}
        target='_blank'
        style={{ color: colors.secondary }}
        css={css`
          color: ${colors.secondary};
          &:hover {
            text-decoration: underline;
          }
        `}
      >
        {props.text}
      </a>
    );
  }

  return (
    <>
      <Helmet>
        Web Bomberman - Credits
      </Helmet>
      <Typography
        variant='h2'
        color='text.primary'
      >
        Credits
      </Typography>
      <Typography
        variant='body1'
        color='text.primary'
        sx={{ marginTop: '64px', textAlign: 'center' }}
      >
        This project was made by <Anchor url='https://github.com/eldskald'
        text='Rafael Bordoni' />.
      </Typography>
      <Typography
        variant='body1'
        color='text.primary'
        sx={{ marginTop: '16px', textAlign: 'center' }}
      >
        This webpage was made with React and TypeScript, and the API was made
        with TypeScript, both are open source licensed under the MIT license.
        Both were made as exercises. The API in particular is a great example
        of OOP and its many design patterns. Feel free to look at the source
        code and learn from it!
      </Typography>
      <Typography
        variant='body1'
        color='text.primary'
        sx={{ marginTop: '16px', textAlign: 'center' }}
      >
        <Anchor
          text="Web page's repository"
          url='https://github.com/web-bomberman/web'
        />
        <br/>
        <Anchor
          text="API's repository"
          url='https://github.com/web-bomberman/api'
        />
      </Typography>
      <Button
        variant='outlined'
        color='primary'
        size='large'
        onClick={() => changeRoute('/')}
        sx={{ marginTop: '64px' }}
      >
        Back to the main page
      </Button>
    </>
  );
}