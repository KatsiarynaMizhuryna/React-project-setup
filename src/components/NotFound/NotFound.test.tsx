import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import notFound from '../../../public/not-found.png';

jest.mock('../../../public/not-found.png', () => '/not-found-image-url');

describe('NotFound component', () => {
  test('renders the component correctly', () => {
    render(<NotFound />);

    expect(
      screen.getByText('Nothing found... Try it once more!')
    ).toBeInTheDocument();
    const image = screen.getByAltText('not-found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('/_next/image?url=%2Fnot-found-image-url&')
    );
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
