import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from './NotFound';
import notfound from '../assets/not-found.png';

jest.mock('../assets/not-found.png', () => 'not-found-image-url');

describe('NotFound component', () => {
  test('renders the component correctly', () => {
    render(<NotFound />);

    expect(
      screen.getByText('Nothing found... Try it once more!')
    ).toBeInTheDocument();
    const image = screen.getByAltText('not-found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'not-found-image-url');
  });

  test('has the correct styles', () => {
    render(<NotFound />);

    const container = screen.getByText(
      'Nothing found... Try it once more!'
    ).parentElement;
    expect(container).toHaveClass('not_found');

    const image = screen.getByAltText('not-found');
    expect(image).toHaveClass('not_found_image');
  });
});
