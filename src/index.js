import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './redux/store'; // Import store and persistor
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: '#f44336',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <ThemeProvider theme={theme}>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  </ThemeProvider>
);

reportWebVitals();
