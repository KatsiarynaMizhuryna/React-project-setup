import {
  selectedCardsReducer,
  selectedCardsActions,
} from '../api/selected_card.slice';
import { Character } from '../../models';
import character from '../../__ tests __/mock_data';

describe('selectedCardsSlice', () => {
  const initialState = {
    selected: [],
  };

  const mockCharacter: Character = character;

  it('should handle initial state', () => {
    expect(selectedCardsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle select action', () => {
    const action = selectedCardsActions.select(mockCharacter);
    const state = selectedCardsReducer(initialState, action);
    expect(state.selected).toEqual([mockCharacter]);
  });

  it('should handle unselect action', () => {
    const populatedState = {
      selected: [mockCharacter],
    };
    const action = selectedCardsActions.unselect(mockCharacter.id);
    const state = selectedCardsReducer(populatedState, action);
    expect(state.selected).toEqual([]);
  });

  it('should handle unselectAll action', () => {
    const populatedState = {
      selected: [mockCharacter, mockCharacter],
    };
    const action = selectedCardsActions.unselectAll();
    const state = selectedCardsReducer(populatedState, action);
    expect(state.selected).toEqual([]);
  });

  it('should not modify state for unknown action', () => {
    const unknownAction = { type: 'unknown' };
    const state = selectedCardsReducer(initialState, unknownAction);
    expect(state).toEqual(initialState);
  });
});
