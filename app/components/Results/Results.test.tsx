import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useSearchParams } from '@remix-run/react';
import Results from './Results';
import character from '../../__ tests __/mock_data';
import { CharacterCardProps } from '../CharacterCard/CharacterCard';
import { CharacterDetailsProps } from '../CharacterDetails/CharacterDetails';
import { PaginationProps } from '../Pagination/Pagination';

jest.mock('@remix-run/react', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock(
  '../CharacterCard/CharacterCard',
  () => (props: CharacterCardProps) => (
    <div data-testid="character-card">{props.character.name}</div>
  )
);

jest.mock(
  '../CharacterDetails/CharacterDetails',
  () => (props: CharacterDetailsProps) => (
    <div data-testid="character-details">
      Details for character {props.characterId}
    </div>
  )
);

jest.mock('../Pagination/Pagination', () => (props: PaginationProps) => (
  <div data-testid="pagination">
    {props.currentPage} of {props.totalPages}
    <button onClick={() => props.onPageChange(props.currentPage + 1)}>
      Next
    </button>
  </div>
));

const mockUseSearchParams = useSearchParams as jest.Mock;

describe('Results component', () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state for characters and pagination', () => {
    mockUseSearchParams.mockReturnValue([new URLSearchParams()]);

    render(
      <Results
        data={[]}
        pageInfo={{ pages: 42, current: 1 }}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText('1 of 42')).toBeInTheDocument();
    expect(screen.queryByTestId('character-card')).not.toBeInTheDocument();
    expect(screen.queryByTestId('character-details')).not.toBeInTheDocument();
  });

  test('renders pagination and calls onPageChange when page changes', async () => {
    mockUseSearchParams.mockReturnValue([new URLSearchParams()]);

    render(
      <Results
        data={[character]}
        pageInfo={{ pages: 5, current: 1 }}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText('1 of 5')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(onPageChange).toHaveBeenCalledWith(2);
    });
  });

  test('renders character details when selectedCharacterId is present', () => {
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams({ details: '1' }),
    ]);

    render(
      <Results
        data={[character]}
        pageInfo={{ pages: 1, current: 1 }}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByTestId('character-details')).toHaveTextContent(
      'Details for character 1'
    );
  });
});
