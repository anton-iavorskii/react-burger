import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from '../actions/ingredients';

const orderInitialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
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
