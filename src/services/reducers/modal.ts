import {
  GET_MODAL_ORDER_OPEN,
  GET_MODAL_ORDER_CLOSE,
  TIngredientsActions,
} from "../actions/ingredients";
import { TModalState } from "../store-types";

const modalInitialState: TModalState = {
  isVisibleOrderModal: false,
};

export const modalReducer = (
  state = modalInitialState,
  action: TIngredientsActions
) => {
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
