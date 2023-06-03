import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_FAILED,
  WS_GET_MESSAGE,
  TWSActions,
} from "../actions/ws";

import { TWSState } from "../store-types";

export const wsInitialState: TWSState = {
  orders: [],
  total: null,
  totalToday: null,
  wsConnected: false,
  error: undefined,
};

export const wsReducer = (state = wsInitialState, action: TWSActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };
    }
    case WS_CONNECTION_FAILED: {
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};
