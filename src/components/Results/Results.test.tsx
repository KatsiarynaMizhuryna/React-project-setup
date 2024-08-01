import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { useRouter } from 'next/router';
import Results from './Results';
import {
  useGetAllcharactersQuery,
  useLazyGetCharactersByNameQuery,
} from '../../store/api/api';

jest.mock('../../store/api/api', () => ({
  useGetAllcharactersQuery: jest.fn(),
  useLazyGetCharactersByNameQuery: jest.fn(),
}));

const mockUseGetAllcharactersQuery = useGetAllcharactersQuery as jest.Mock;
const mockUseLazyGetCharactersByNameQuery =
  useLazyGetCharactersByNameQuery as jest.Mock;

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  query: {},
  push: mockPush,
});

describe('Results component', () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state for characters and pagination', () => {
    mockUseGetAllcharactersQuery.mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
      isFetching: false,
    });
    mockUseLazyGetCharactersByNameQuery.mockReturnValue([
      jest.fn(),
      {
        data: null,
        isLoading: false,
        isError: false,
      },
    ]);

    render(<Results page={1} searchTerm="" onPageChange={onPageChange} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Error fetching data.')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Loading characters by name...')
    ).not.toBeInTheDocument();
  });

  test('renders error state for characters', () => {
    mockUseGetAllcharactersQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
      isFetching: false,
    });
    mockUseLazyGetCharactersByNameQuery.mockReturnValue([
      jest.fn(),
      {
        data: null,
        isLoading: false,
        isError: false,
      },
    ]);

    render(<Results page={1} searchTerm="" onPageChange={onPageChange} />);

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Error fetching data.')).toBeInTheDocument();
  });

  test('renders NotFound component when search results fail', () => {
    mockUseGetAllcharactersQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: null,
      isFetching: false,
    });
    mockUseLazyGetCharactersByNameQuery.mockReturnValue([
      jest.fn(),
      {
        data: null,
        isLoading: false,
        isError: true,
      },
    ]);

    render(<Results page={1} searchTerm="test" onPageChange={onPageChange} />);

    expect(
      screen.queryByText('Loading characters by name...')
    ).not.toBeInTheDocument();
    expect(
      screen.getByText('Nothing found... Try it once more!')
    ).toBeInTheDocument();
  });

  test('renders pagination and calls onPageChange when page changes', async () => {
    mockUseGetAllcharactersQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { info: { pages: 5 }, results: [] },
      isFetching: false,
    });
    mockUseLazyGetCharactersByNameQuery.mockReturnValue([
      jest.fn(),
      {
        data: null,
        isLoading: false,
        isError: false,
      },
    ]);

    render(<Results page={1} searchTerm="" onPageChange={onPageChange} />);

    expect(screen.getByText('1 of 5')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText('>'));
    });

    await waitFor(() => {
      expect(onPageChange).toHaveBeenCalledWith(2);
    });
  });

  test('fetches characters by name when searchTerm changes', () => {
    const fetchData = jest.fn();
    mockUseLazyGetCharactersByNameQuery.mockReturnValue([
      fetchData,
      {
        data: { results: [] },
        isLoading: false,
        isError: false,
      },
    ]);

    render(<Results page={1} searchTerm="test" onPageChange={onPageChange} />);

    expect(fetchData).toHaveBeenCalledWith('test');
  });
});
