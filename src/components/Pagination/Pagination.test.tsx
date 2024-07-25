import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';
import { act } from 'react';

describe('Pagination component', () => {
  const mockOnPageChange = jest.fn();

  const setup = (
    currentPage: number,
    totalPages: number,
    isLoading: boolean
  ) => {
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={mockOnPageChange}
        isLoading={isLoading}
      />
    );
  };

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  test('renders the component correctly', () => {
    setup(1, 5, false);

    expect(screen.getByText('1 of 5')).toBeInTheDocument();
    expect(screen.getByText('<<')).toBeInTheDocument();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText('>>')).toBeInTheDocument();
  });

  test('disables previous buttons on the first page', () => {
    setup(1, 5, false);

    expect(screen.getAllByText('<<')[0]).toBeDisabled();
    expect(screen.getAllByText('<')[0]).toBeDisabled();
  });

  test('disables next buttons on the last page', () => {
    setup(5, 5, false);

    expect(screen.getAllByText('>>')[0]).toBeDisabled();
    expect(screen.getAllByText('>')[0]).toBeDisabled();
  });

  test('enables all buttons on a middle page', () => {
    setup(3, 5, false);

    expect(screen.getAllByText('<<')[0]).not.toBeDisabled();
    expect(screen.getAllByText('<')[0]).not.toBeDisabled();
    expect(screen.getAllByText('>')[0]).not.toBeDisabled();
    expect(screen.getAllByText('>>')[0]).not.toBeDisabled();
  });

  test('calls onPageChange with the correct page when clicking next button', async () => {
    setup(3, 5, false);
    await act(async () => {
      fireEvent.click(screen.getAllByText('>')[0]);
    });

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  test('calls onPageChange with the correct page when clicking previous button', async () => {
    setup(3, 5, false);
    await act(async () => {
      fireEvent.click(screen.getAllByText('<')[0]);
    });

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange with the correct page when clicking first button', async () => {
    setup(3, 5, false);

    await act(async () => {
      fireEvent.click(screen.getAllByText('<<')[0]);
    });

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test('calls onPageChange with the correct page when clicking last button', async () => {
    setup(3, 5, false);

    await act(async () => {
      fireEvent.click(screen.getAllByText('>>')[0]);
    });

    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });
});
