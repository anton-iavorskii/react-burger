import {
  GET_MODAL_ORDER_OPEN,
  GET_MODAL_ORDER_CLOSE,
} from '../actions/ingredients';

const modalInitialState = {
  isVisibleOrderModal: false,
};

export const modalReducer = (state = modalInitialState, action) => {
  switch (action.type) {
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
