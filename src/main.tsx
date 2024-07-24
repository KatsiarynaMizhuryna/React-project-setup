import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from './switchTheme/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
