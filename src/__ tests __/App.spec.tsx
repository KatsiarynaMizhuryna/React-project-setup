//import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../store';
import { ThemeProvider } from '../switchTheme/ThemeContext';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

test('demo', () => {
  expect(true).toBe(true);
});

// test('Renders the main page', async () => {
//   await act(async () => {
//     render(
//       <Provider store={store}>
//         <ThemeProvider>
//           <ErrorBoundary>
//             <App />
//           </ErrorBoundary>
//         </ThemeProvider>
//       </Provider>
//     );
//   });
//   expect(true).toBeTruthy();
// });
