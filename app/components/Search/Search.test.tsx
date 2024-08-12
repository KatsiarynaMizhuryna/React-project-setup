import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Search from './Search';
import { useTheme } from '../../switchTheme/ThemeContext';
import { useNavigate, useSearchParams } from '@remix-run/react';

jest.mock('../../switchTheme/ThemeContext', () => ({
  useTheme: jest.fn(),
}));
jest.mock('@remix-run/react', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));
const mockUseNavigate = useNavigate as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;
const mockUseTheme = useTheme as jest.Mock;

describe('Search component', () => {
  const onSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNavigate.mockReturnValue(jest.fn());
    mockUseSearchParams.mockReturnValue([new URLSearchParams()]);
    mockUseTheme.mockReturnValue({ theme: 'light' });
  });

  test('renders Search component with initial search term', () => {
    render(<Search onSearch={onSearch} initialSearch="Rick" />);

    expect(
      screen.getByPlaceholderText('Search character...')
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue('Rick')).toBeInTheDocument();
    expect(screen.getByAltText('rick-and-morty logo')).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(<Search onSearch={onSearch} initialSearch="Rick" />);

    const input = screen.getByPlaceholderText(
      'Search character...'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Morty' } });

    expect(input.value).toBe('Morty');
  });

  // test('applies the theme class to the body based on the theme context', () => {
  //   mockUseTheme.mockReturnValue({ theme: 'dark' });

  //   render(<Search onSearch={onSearch} initialSearch="Rick" />);

  //   expect(document.body.className).toBe('dark');
  // });
});
