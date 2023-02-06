import { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { css } from '@emotion/react';
import { green } from '@mui/material/colors';

export const colors = {
  primary: '#17c917',
  halfPrimary: '#17c91750',
  secondary: '#10f0f0',
  halfSecondary: '#10f0f050',
  tertiary: '#f1b32b',
  halfTertiary: '#f1b32b50',
  error: '#e44040',
  halfError: '#e4404050',
  contrast: '#ffffff',
  halfContrast: '#ffffff50',
  background: '#0c140c'
};

export const fonts = {
  display: 'Goldman',
  script: 'Tomorrow'
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      contrastText: colors.background
    },
    secondary: {
      main: colors.secondary,
      contrastText: colors.background
    },
    error: {
      main: colors.error,
      contrastText: colors.background
    },
    text: {
      primary: colors.primary,
      secondary: colors.halfPrimary,
      disabled: 'rgba(0, 0, 0, 0.3)'
    }
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: { fontFamily: fonts.display }
        },
        {
          props: { variant: 'outlined' },
          style: { fontFamily: fonts.display }
        }
      ]
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: { borderColor: colors.halfPrimary }
      }
    }
  },
  typography: {
    fontFamily: fonts.script,
    h1: {
      fontFamily: fonts.display,
      fontVariant: 'small-caps'
    },
    h2: {
      fontFamily: fonts.display,
      fontVariant: 'small-caps'
    },
    h3: {
      fontFamily: fonts.display,
      fontVariant: 'small-caps'
    },
    h4: {
      fontFamily: fonts.display,
      fontVariant: 'small-caps'
    },
    h5: {
      fontFamily: fonts.display,
      fontVariant: 'small-caps'
    },
  }
});

export function MUIThemeProvider(props: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
}