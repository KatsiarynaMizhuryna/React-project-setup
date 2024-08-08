import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

jest.mock('../../assets/error.png', () => 'mocked-error-image-path');

const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
};

describe('ErrorBoundary', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Child component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  test('renders fallback UI when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('Something went wrong... Refresh this page')
    ).toBeInTheDocument();
    expect(screen.getByAltText('error')).toHaveAttribute(
      'src',
      'mocked-error-image-path'
    );
  });
});
