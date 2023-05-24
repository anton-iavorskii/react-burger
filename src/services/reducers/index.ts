import { combineReducers } from "redux";

import { allIngredientsReducer } from "./ingredients";
import { constructorReducer } from "./burger-constructor";
import { modalReducer } from "./modal";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { wsReducer } from "./ws";

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  constructorBurger: constructorReducer,
  modal: modalReducer,
  order: orderReducer,
  user: userReducer,
  ws: wsReducer,
});
