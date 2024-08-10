import React from 'react';
import './App.css';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const App: React.FC = () => {
  return (
    <Provider store={store()}>
      <ThemeProvider theme={theme}>
        <Routes />;
      </ThemeProvider>
    </Provider>
  );
};

export default App;
