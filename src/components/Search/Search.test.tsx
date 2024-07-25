import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Search from './Search';
import { useTheme } from '../../switchTheme/ThemeContext';

jest.mock('../../switchTheme/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('Search component', () => {
  const mockUseTheme = useTheme as jest.Mock;
  const onSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
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

  test('calls onSearch with trimmed search term and saves it to localStorage on search button click', async () => {
    render(<Search onSearch={onSearch} initialSearch=" Rick " />);

    const input = screen.getByPlaceholderText(
      'Search character...'
    ) as HTMLInputElement;
    const button = screen.getByText('Search');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(onSearch).toHaveBeenCalledWith('Rick');
    expect(localStorage.getItem('searchTerm')).toBe('Rick');
  });

  test('updates input value when initialSearch prop changes', () => {
    const { rerender } = render(
      <Search onSearch={onSearch} initialSearch="Rick" />
    );

    rerender(<Search onSearch={onSearch} initialSearch="Morty" />);

    const input = screen.getByPlaceholderText(
      'Search character...'
    ) as HTMLInputElement;
    expect(input.value).toBe('Morty');
  });

  test('applies the theme class to the body based on the theme context', () => {
    mockUseTheme.mockReturnValue({ theme: 'dark' });

    render(<Search onSearch={onSearch} initialSearch="Rick" />);

    expect(document.body.className).toBe('dark');
  });
});
