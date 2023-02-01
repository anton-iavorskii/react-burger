import { BUN } from '../../utils/consts';
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  REORDER_CONSTRUCTOR_INGREDIENTS,
  DELETE_CONSTRUCTOR_INGREDIENT,
} from '../actions/ingredients';

const constructorInitialState = {
  constructorItems: [],
};

export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGREDIENT: {
      const bun = state.constructorItems.find((item) => item.type === BUN);
      const newItem = action.item;
      const notBuns = state.constructorItems.filter(
        (item) => item.type !== BUN
      );

      return {
        ...state,
        constructorItems: !bun
          ? [...state.constructorItems, newItem]
          : bun && newItem.type !== BUN
          ? [...state.constructorItems, newItem]
          : [...notBuns, newItem],
      };
    }
    case REORDER_CONSTRUCTOR_INGREDIENTS: {
      const dragItem = state.constructorItems[action.from];
      const hoverItem = state.constructorItems[action.to];
      const updatedArray = [...state.constructorItems];
      updatedArray[action.from] = hoverItem;
      updatedArray[action.to] = dragItem;

      return {
        ...state,
        constructorItems: updatedArray,
      };
    }
    case DELETE_CONSTRUCTOR_INGREDIENT: {
      const updatedArray = [...state.constructorItems];
      updatedArray.splice(action.index, 1);
      return {
        ...state,
        constructorItems: updatedArray,
      };
    }
    default: {
      return state;
    }
  }
};
