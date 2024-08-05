import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterDetails from './CharacterDetails';
import { useGetCharacterByIdQuery } from '../../store/api/api';
import character from '../../__ tests __/mock_data';

import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('../../store/api/api', () => ({
  useGetCharacterByIdQuery: jest.fn(),
}));

describe('CharacterDetails', () => {
  const mockPush = jest.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  test('renders character name', () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: character,
      isLoading: false,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText(character.name)).toBeInTheDocument();
  });

  test('renders character status', () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: character,
      isLoading: false,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    expect(screen.getByText(/Status:/)).toBeInTheDocument();
    expect(screen.getByText(character.status)).toBeInTheDocument();
  });

  test('renders character species', () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: character,
      isLoading: false,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    expect(screen.getByText(/Species:/)).toBeInTheDocument();
    expect(screen.getByText(character.species)).toBeInTheDocument();
  });

  test('renders character gender', () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: character,
      isLoading: false,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    expect(screen.getByText(/Gender:/)).toBeInTheDocument();
    expect(screen.getByText(character.gender)).toBeInTheDocument();
  });

  test('renders character last known location', () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: character,
      isLoading: false,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    expect(screen.getByText(/Last Known Location:/)).toBeInTheDocument();
    const locationLink = screen.getByRole('link', {
      name: character.location.name,
    });
    expect(locationLink).toHaveAttribute('href', character.location.url);
  });

  test('renders loading state', () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<CharacterDetails characterId="1" />);

    expect(
      screen.getByText('Error loading character details.')
    ).toBeInTheDocument();
  });

  test('calls closeDetails on button click', () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: character,
      isLoading: false,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    const closeButton = screen.getByText('Close');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith(`/?`, { scroll: true });
  });
});
