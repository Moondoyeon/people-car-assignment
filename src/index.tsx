import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import App from './App';
import { colors } from './styles/theme';
import CarInfoProvider from './context/CarListContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CarInfoProvider>
        <ThemeProvider theme={colors}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </CarInfoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
