import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { selectedCardsActions } from '../store/api/selected_card.slice';

const actions = { ...selectedCardsActions };

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
