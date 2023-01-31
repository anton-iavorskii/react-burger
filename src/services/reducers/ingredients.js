import { BUN, SAUSECES, FILLING } from '../../utils/consts';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENT,
  GET_MODAL_INGREDIENT_CLOSE,
  GET_MODAL_INGREDIENT_OPEN,
  GET_MODAL_ORDER_OPEN,
  GET_MODAL_ORDER_CLOSE,
  ADD_CONSTRUCTOR_INGREDIENT,
  REORDER_CONSTRUCTOR_INGREDIENTS,
  DELETE_CONSTRUCTOR_INGREDIENT,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from '../actions/ingredients';

const allIngredientsInitialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  ingredient: null,
  constructorItems: [],
  order: null,
  orderRequest: false,
  orderFailed: false,
};

const modalInitialState = {
  isVisibleIngredientModal: false,
  isVisibleOrderModal: false,
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
    case ADD_CONSTRUCTOR_INGREDIENT: {
      const bun = state.constructorItems.find((item) => item.type === BUN);
      const newItem = state.items.find((item) => item._id === action.id);
      const notBuns = state.constructorItems.filter(
        (item) => item.type !== BUN
      );

      return {
        ...state,
        constructorItems: !bun
          ? [
              ...state.constructorItems,
              state.items.find((item) => item._id === action.id),
            ]
          : bun && newItem.type !== BUN
          ? [
              ...state.constructorItems,
              state.items.find((item) => item._id === action.id),
            ]
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
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        order: action.item,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        order: null,
        itemsFailed: true,
        itemsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const modalReducer = (state = modalInitialState, action) => {
  switch (action.type) {
    case GET_MODAL_INGREDIENT_OPEN: {
      return {
        ...state,
        isVisibleIngredientModal: true,
      };
    }
    case GET_MODAL_INGREDIENT_CLOSE: {
      return {
        ...state,
        isVisibleIngredientModal: false,
      };
    }
    case GET_MODAL_ORDER_OPEN: {
      return {
        ...state,
        isVisibleOrderModal: true,
      };
    }
    case GET_MODAL_ORDER_CLOSE: {
      return {
        ...state,
        isVisibleOrderModal: false,
      };
    }
    default: {
      return state;
    }
  }
};
