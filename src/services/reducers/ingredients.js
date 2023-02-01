import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENT,
} from '../actions/ingredients';

const allIngredientsInitialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  ingredient: null,
};

export const allIngredientsReducer = (
  state = allIngredientsInitialState,
  action
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, items: [], itemsFailed: true, itemsRequest: false };
    }
    case GET_INGREDIENT: {
      return {
        ...state,
        ingredient: state.items.find((item) => item._id === action.id),
      };
    }
    default: {
      return state;
    }
  }
};
