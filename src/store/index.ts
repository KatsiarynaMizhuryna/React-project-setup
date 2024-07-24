import { configureStore } from '@reduxjs/toolkit';
import { API } from './api/api';
import { selectedCardsReducer } from './api/selected_card.slice';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    selectedCard: selectedCardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export default store;
