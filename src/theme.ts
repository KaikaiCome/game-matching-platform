import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7c4dff'
    },
    secondary: {
      main: '#00bcd4'
    },
    background: {
      default: '#f7f7fb',
      paper: '#ffffff'
    }
  },
  shape: {
    borderRadius: 10
  }
}); 