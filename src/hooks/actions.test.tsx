import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useActions } from './actions';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as selectedCardsActions from '../store/api/selected_card.slice';
import { Character } from '../models';
import character from '../__ tests __/mock_data';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('redux', () => ({
  bindActionCreators: jest.fn(),
}));

describe('useActions hook', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Cast useDispatch to jest.Mock type
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //   test('should call useDispatch and bindActionCreators with actions and dispatch', () => {
  //     renderHook(() => useActions());

  //     expect(useDispatch).toHaveBeenCalled();
  //     expect(bindActionCreators).toHaveBeenCalledWith(
  //       selectedCardsActions,
  //       mockDispatch
  //     );
  //   });

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

  //   test('should call dispatch when an action is invoked', () => {
  //     const mockCharacter: Character = character; // Replace with actual character structure
  //     const action = jest.fn();
  //     const boundActions = {
  //       select: action,
  //       unselect: action,
  //       unselectAll: action,
  //     };
  //     (bindActionCreators as jest.Mock).mockReturnValue(boundActions);

  //     const { result } = renderHook(() => useActions());

  //     result.current.select(mockCharacter);
  //     result.current.unselect(mockCharacter.id);
  //     result.current.unselectAll();

  //     expect(action).toHaveBeenCalledTimes(3);
  //     expect(action).toHaveBeenCalledWith(mockCharacter);
  //     expect(action).toHaveBeenCalledWith(mockCharacter.id);
  //     expect(action).toHaveBeenCalledWith();
  //     expect(mockDispatch).toHaveBeenCalledTimes(3);
  // });
});
