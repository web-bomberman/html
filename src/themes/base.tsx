import { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

export const colors = {
  primary: '#17c917',
  secondary: '#10f0f0',
  tertiary: '#f1b32b',
  error: '#e44040',
  contrast: '#ffffff',
  halfContrast: '#b3b7b9',
  background: '#0c140c'
};

export const fonts = {
  display: 'Bebas Neue',
  script: 'Roboto'
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
      primary: colors.contrast,
      secondary: colors.halfContrast,
      disabled: 'rgba(0, 0, 0, 0.3)'
    }
  }
});

export function MUIThemeProvider(props: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
}