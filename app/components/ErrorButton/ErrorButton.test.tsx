import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorButton from './ErrorButton';

describe('ErrorButton Component', () => {
  test('renders correctly', () => {
    render(<ErrorButton />);
    const button = screen.getByRole('button', { name: /trigger error/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('error_button');
  });
});
