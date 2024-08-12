import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import CharacterDetails from './CharacterDetails';
import character from '../../__ tests __/mock_data';
import { useNavigate, useSearchParams } from '@remix-run/react';
import { useGetCharacterByIdQuery } from '../../store/api/api';

jest.mock('@remix-run/react', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('../../store/api/api', () => ({
  useGetCharacterByIdQuery: jest.fn(),
}));

describe('CharacterDetails', () => {
  const mockNavigate = jest.fn();
  const mockUseSearchParams = useSearchParams as jest.Mock;
  const mockUseGetCharacterByIdQuery = useGetCharacterByIdQuery as jest.Mock;

  beforeEach(() => {
    mockUseSearchParams.mockReturnValue([new URLSearchParams(), jest.fn()]);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<CharacterDetails characterId="1" />);

    expect(
      screen.getByText('Error loading character details.')
    ).toBeInTheDocument();
  });

  test('renders character image', () => {
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: character,
      isLoading: false,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    const image = screen.getByAltText(character.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', character.image);
  });

  test('renders character name', () => {
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: character,
      isLoading: false,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    const name = screen.getByText(/Name:/);
    expect(name).toBeInTheDocument();
    expect(screen.getByText(character.name)).toBeInTheDocument();
  });

  test('renders character status', () => {
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: character,
      isLoading: false,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    const status = screen.getByText(/Status:/);
    expect(status).toBeInTheDocument();
    expect(screen.getByText(character.status)).toBeInTheDocument();
  });

  test('renders character species', () => {
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: character,
      isLoading: false,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    const species = screen.getByText(/Species:/);
    expect(species).toBeInTheDocument();
    expect(screen.getByText(character.species)).toBeInTheDocument();
  });

  test('renders character gender', () => {
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: character,
      isLoading: false,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    const gender = screen.getByText(/Gender:/);
    expect(gender).toBeInTheDocument();
    expect(screen.getByText(character.gender)).toBeInTheDocument();
  });

  test('renders character last known location', () => {
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: character,
      isLoading: false,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    const location = screen.getByText(/Last Known Location:/);
    expect(location).toBeInTheDocument();
    expect(screen.getByText(character.location.name)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: character.location.name })
    ).toHaveAttribute('href', character.location.url);
  });

  test('navigates back when close button is clicked', () => {
    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: character,
      isLoading: false,
      isError: false,
    });

    render(<CharacterDetails characterId="1" />);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalled();
  });
});
