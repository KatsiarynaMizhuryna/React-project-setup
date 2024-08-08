import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useActions } from './actions';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('redux', () => ({
  bindActionCreators: jest.fn(),
}));

describe('useActions hook', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return bound actions', () => {
    const boundActions = {
      select: jest.fn(),
      unselect: jest.fn(),
      unselectAll: jest.fn(),
    };
    (bindActionCreators as jest.Mock).mockReturnValue(boundActions);

    const { result } = renderHook(() => useActions());

    expect(result.current).toEqual(boundActions);
  });
});
