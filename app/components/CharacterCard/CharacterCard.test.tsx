import React from 'react';
import character from '../../__ tests __/mock_data';
import '@testing-library/jest-dom';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { useActions } from '../../hooks/actions';
import { UseAppSelector } from '../../hooks/redux';
import CharacterCard from './CharacterCard';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate, useSearchParams } from '@remix-run/react';

jest.mock('../../hooks/actions');
jest.mock('../../hooks/redux');
jest.mock('@remix-run/react', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('CharacterCard', () => {
  const mockSelect = jest.fn();
  const mockUnselect = jest.fn();
  const mockUseActions = useActions as jest.Mock;
  const mockUseAppSelector = UseAppSelector as jest.Mock;
  const mockUseNavigate = useNavigate as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    mockUseActions.mockReturnValue({
      select: mockSelect,
      unselect: mockUnselect,
    });
    mockUseAppSelector.mockReturnValue({ selected: [] });
    mockUseNavigate.mockReturnValue(jest.fn());
    mockUseSearchParams.mockReturnValue([new URLSearchParams(), jest.fn()]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders character information', () => {
    render(
      <BrowserRouter>
        <CharacterCard character={character} />
      </BrowserRouter>
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByAltText('Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character 1')).toBeInTheDocument();
  });

  test('calls select when the checkbox is checked', async () => {
    render(
      <BrowserRouter>
        <CharacterCard character={character} />
      </BrowserRouter>
    );

    const checkbox = screen.getByRole('checkbox');
    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(mockSelect).toHaveBeenCalledWith(character);
    expect(mockUnselect).not.toHaveBeenCalled();
  });

  test('calls unselect when the checkbox is unchecked', async () => {
    mockUseAppSelector.mockReturnValue({ selected: [character] });

    render(
      <BrowserRouter>
        <CharacterCard character={character} />
      </BrowserRouter>
    );

    const checkbox = screen.getByRole('checkbox');
    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(mockUnselect).toHaveBeenCalledWith(character.id);
    expect(mockSelect).not.toHaveBeenCalled();
  });

  test('checkbox is checked when the character is selected', () => {
    mockUseAppSelector.mockReturnValue({ selected: [character] });

    render(
      <BrowserRouter>
        <CharacterCard character={character} />
      </BrowserRouter>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('checkbox is unchecked when the character is not selected', () => {
    render(
      <BrowserRouter>
        <CharacterCard character={character} />
      </BrowserRouter>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('navigates to character details on image click', () => {
    const navigateMock = jest.fn();
    mockUseNavigate.mockReturnValue(navigateMock);

    render(
      <BrowserRouter>
        <CharacterCard character={character} />
      </BrowserRouter>
    );

    const image = screen.getByAltText('Character 1');
    fireEvent.click(image);

    expect(navigateMock).toHaveBeenCalled();
  });
});
