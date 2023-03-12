import { css } from '@emotion/react';
import { Typography, Button } from '@mui/material';
import { useRoute } from 'hooks';
import { colors } from 'themes';

export function Credits() {
  const { changeRoute } = useRoute();

  const Anchor = (props: { url: string; text: string }) => {
    return (
      <a
        href={props.url}
        target="_blank"
        rel="noreferrer"
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
  };

  return (
    <>
      <Typography variant="h2" color="text.primary" sx={{ marginTop: '64px' }}>
        Credits
      </Typography>
      <Typography
        variant="body1"
        color="text.primary"
        sx={{ marginTop: '64px', textAlign: 'center' }}
      >
        This project was made by{' '}
        <Anchor url="https://github.com/eldskald" text="Rafael Bordoni" />.
      </Typography>
      <Typography
        variant="body1"
        color="text.primary"
        sx={{ margin: '16px', textAlign: 'center' }}
      >
        This webpage was made with React and TypeScript, and the API was made
        with TypeScript, both are open source licensed under the MIT license.
        Both were made as practice. The API in particular is a great example of
        OOP and its many design patterns. Feel free to look at the source code
        and learn from it!
        <br />
        <br />
        Pixel graphics were done by me, the icons on the mobile controls are
        from <Anchor text="game-icons.net" url="https://game-icons.net" />,
        licensed under CC-BY-3.0, bomb by Lorc and arrow by Delapouite.
      </Typography>
      <Typography
        variant="body1"
        color="text.primary"
        sx={{ marginTop: '16px', textAlign: 'center' }}
      >
        <Anchor
          text="Web page's repository"
          url="https://github.com/web-bomberman/web"
        />
        <br />
        <Anchor
          text="API's repository"
          url="https://github.com/web-bomberman/api"
        />
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => changeRoute('/')}
        sx={{ marginTop: '64px' }}
      >
        Back to the main page
      </Button>
    </>
  );
}
