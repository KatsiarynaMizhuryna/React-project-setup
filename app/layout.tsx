'use client';
import { ThemeProvider } from '@/src/components/switchTheme/ThemeContext';
import store from '@/src/store';
import { Provider } from 'react-redux';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
