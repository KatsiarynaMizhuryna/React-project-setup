import { AppProps } from 'next/app';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '../components/switchTheme/ThemeContext';
import { Provider } from 'react-redux';
import store from '../store';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
