import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useActions } from '../../hooks/actions';
import { UseAppSelector } from '../../hooks/redux';
import Flyout from './flyout';
import { saveAs } from 'file-saver';

jest.mock('../../hooks/actions');
jest.mock('../../hooks/redux');
jest.mock('file-saver', () => ({ saveAs: jest.fn() }));

const mockUnselectAll = jest.fn();

describe('Flyout component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useActions as jest.Mock).mockReturnValue({ unselectAll: mockUnselectAll });
  });

  test('renders correctly when there are selected cards', () => {
    (UseAppSelector as jest.Mock).mockReturnValue([
      {
        id: 1,
        name: 'Card 1',
        status: 'active',
        species: 'species 1',
        url: 'url1',
        origin: { name: 'origin 1', url: 'originUrl1' },
        location: { name: 'location 1' },
      },
    ]);

    render(<Flyout />);

    expect(screen.getByText('1 items are selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  test('does not render when there are no selected cards', () => {
    (UseAppSelector as jest.Mock).mockReturnValue([]);

    const { container } = render(<Flyout />);

    expect(container.firstChild).toBeNull();
  });

  test('calls unselectAll when "Unselect all" button is clicked', () => {
    (UseAppSelector as jest.Mock).mockReturnValue([
      {
        id: 1,
        name: 'Card 1',
        status: 'active',
        species: 'species 1',
        url: 'url1',
        origin: { name: 'origin 1', url: 'originUrl1' },
        location: { name: 'location 1' },
      },
    ]);

    render(<Flyout />);

    fireEvent.click(screen.getByText('Unselect all'));

    expect(mockUnselectAll).toHaveBeenCalled();
  });

  test('calls saveAs with correct CSV content when "Download" button is clicked', () => {
    const selectedCards = [
      {
        id: 1,
        name: 'Card 1',
        status: 'active',
        species: 'species 1',
        url: 'url1',
        origin: { name: 'origin 1', url: 'originUrl1' },
        location: { name: 'location 1' },
      },
    ];

    (UseAppSelector as jest.Mock).mockReturnValue(selectedCards);

    render(<Flyout />);

    fireEvent.click(screen.getByText('Download'));

    const expectedCsvContent =
      '1,Card 1,active,species 1,url1,origin 1,originUrl1,location 1';
    const blob = new Blob([expectedCsvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    expect(saveAs).toHaveBeenCalledWith(blob, '1_cards.csv');
  });
});
