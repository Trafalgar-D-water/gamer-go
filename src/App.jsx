import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './redux/store.js'
import ThemeProvider from './theme/index.jsx';
import Router from './Routes/index.jsx';

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;


// latest git check

// github check

// one more check
