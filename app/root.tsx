import './styles/global.css';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from './switchTheme/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
