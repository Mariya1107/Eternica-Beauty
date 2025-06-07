import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // <-- import your CSS here
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a148c', // your purple shade
    },
    secondary: {
      main: '#38006b', // your darker purple hover color
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
