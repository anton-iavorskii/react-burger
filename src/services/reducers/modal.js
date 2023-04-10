import {
  GET_MODAL_INGREDIENT_CLOSE,
  GET_MODAL_INGREDIENT_OPEN,
  GET_MODAL_ORDER_OPEN,
  GET_MODAL_ORDER_CLOSE,
} from '../actions/ingredients';

const modalInitialState = {
  isVisibleIngredientModal: false,
  isVisibleOrderModal: false,
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
