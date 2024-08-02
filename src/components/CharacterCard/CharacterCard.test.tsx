import React from 'react';
import character from '../../__ tests __/mock_data';
import '@testing-library/jest-dom';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { useActions } from '../../hooks/actions';
import { UseAppSelector } from '../../hooks/redux';
import { useRouter, useSearchParams } from 'next/navigation';
import CharacterCard from './CharacterCard';

jest.mock('../../hooks/actions');
jest.mock('../../hooks/redux');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('CharacterCard', () => {
  const mockSelect = jest.fn();
  const mockUnselect = jest.fn();
  const mockUseActions = useActions as jest.Mock;
  const mockUseAppSelector = UseAppSelector as jest.Mock;
  const mockRouterPush = jest.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    mockUseActions.mockReturnValue({
      select: mockSelect,
      unselect: mockUnselect,
    });
    mockUseAppSelector.mockReturnValue({ selected: [] });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders character information', () => {
    render(<CharacterCard character={character} />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByAltText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.name)).toBeInTheDocument();
  });

  test('calls select when the checkbox is checked', async () => {
    render(<CharacterCard character={character} />);

    const checkbox = screen.getByRole('checkbox');
    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(mockSelect).toHaveBeenCalledWith(character);
    expect(mockUnselect).not.toHaveBeenCalled();
  });

  test('calls unselect when the checkbox is unchecked', async () => {
    mockUseAppSelector.mockReturnValue({ selected: [character] });

    render(<CharacterCard character={character} />);

    const checkbox = screen.getByRole('checkbox');
    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(mockUnselect).toHaveBeenCalledWith(character.id);
    expect(mockSelect).not.toHaveBeenCalled();
  });

  test('checkbox is checked when the character is selected', () => {
    mockUseAppSelector.mockReturnValue({ selected: [character] });

    render(<CharacterCard character={character} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('checkbox is unchecked when the character is not selected', () => {
    render(<CharacterCard character={character} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('navigates to character details on image click', () => {
    render(<CharacterCard character={character} />);

    const image = screen.getByAltText(character.name);
    fireEvent.click(image);

    expect(mockRouterPush).toHaveBeenCalledWith(`/?details=${character.id}`, {
      scroll: true,
    });
  });
});
