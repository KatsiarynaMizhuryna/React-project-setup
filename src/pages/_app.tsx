import { AppProps } from 'next/app';
import { ThemeProvider } from '../components/switchTheme/ThemeContext';
import { Provider } from 'react-redux';
import store from '../store';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
