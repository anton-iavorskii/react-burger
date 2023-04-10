import { combineReducers } from 'redux';

import { allIngredientsReducer } from './ingredients';
import { constructorReducer } from './burger-constructor';
import { modalReducer } from './modal';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  constructorBurger: constructorReducer,
  modal: modalReducer,
  order: orderReducer,
});
