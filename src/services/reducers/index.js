import { combineReducers } from 'redux';

import { allIngredientsReducer, modalReducer } from './ingredients';

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  modal: modalReducer,
});
