import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../models';

interface SelectedCardsState {
  selected: Character[];
}

const initialState: SelectedCardsState = {
  selected: [],
};

export const selectedCardsSlice = createSlice({
  name: 'selected cards',
  initialState,
  reducers: {
    select(state, action: PayloadAction<Character>) {
      state.selected.push(action.payload);
    },
    unselect(state, action: PayloadAction<number>) {
      state.selected = state.selected.filter(
        (card) => card.id !== action.payload
      );
    },
    unselectAll(state) {
      state.selected = [];
    },
  },
});

export const selectedCardsActions = selectedCardsSlice.actions;
export const selectedCardsReducer = selectedCardsSlice.reducer;
