import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Router from './components/Router';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FF9900' },
    secondary: { main: '#CC3300' },
    background: { default: '#121212', paper: '#1E1E1E' },
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
  components: {
    MuiPaper: { defaultProps: { elevation: 2 } },
  },
});

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}
