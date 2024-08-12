import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

describe('ThemeProvider', () => {
  test('should provide default theme', () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div>{theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('light')).toBeInTheDocument();
  });

  test('should allow theme to be changed', () => {
    const TestComponent = () => {
      const { theme, setTheme } = useTheme();

      return (
        <div>
          <span>{theme}</span>
          <button onClick={() => setTheme('dark')}>Change to Dark</button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('light')).toBeInTheDocument();

    act(() => {
      screen.getByText('Change to Dark').click();
    });

    expect(screen.getByText('dark')).toBeInTheDocument();
  });
});
