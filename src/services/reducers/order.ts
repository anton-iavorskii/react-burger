import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  TIngredientsActions,
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_FAILED,
} from "../actions/ingredients";
import { TOrderState } from "../store-types";

const orderInitialState: TOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
  orderInfo: null,
  orderInfoRequest: false,
  orderInfoFailed: false,
};

export const orderReducer = (
  state = orderInitialState,
  action: TIngredientsActions
) => {
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

    case GET_ORDER_INFO_REQUEST: {
      return {
        ...state,
        orderInfoRequest: true,
      };
    }
    case GET_ORDER_INFO_SUCCESS: {
      return {
        ...state,
        orderInfoFailed: false,
        orderInfo: action.item,
        orderInfoRequest: false,
      };
    }
    case GET_ORDER_INFO_FAILED: {
      return {
        ...state,
        orderInfo: null,
        orderInfoFailed: true,
        orderInfoRequest: false,
      };
    }

    default: {
      return state;
    }
  }
};
