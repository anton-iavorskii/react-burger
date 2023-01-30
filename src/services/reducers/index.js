import { combineReducers } from 'redux';

import {
  allIngredientsReducer,
  modalReducer,
  tabsReducer,
} from './ingredients';

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  modal: modalReducer,
  tabs: tabsReducer,
});
