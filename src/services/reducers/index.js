import { combineReducers } from 'redux';

import {
  allIngredientsReducer,
  constructorReducer,
  orderReducer,
  modalReducer,
  tabsReducer,
} from './ingredients';

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  constructor: constructorReducer,
  order: orderReducer,
  modal: modalReducer,
  tabs: tabsReducer,
});
