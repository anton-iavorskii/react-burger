import { BUN, SAUSECES, FILLING } from '../../utils/consts';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENT,
  DELETE_INGREDIENT,
  GET_MODAL_OPEN,
  GET_MODAL_CLOSE,
  TAB_SWITCH,
} from '../actions/ingredients';

const allIngredientsInitialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  ingredient: null,
};

const constructorInitialState = {
  items: [],
  ingredient: null,
  order: null,
};

const orderInitialState = {
  number: null,
};

const modalInitialState = {
  isVisible: false,
};

const tabsInitialState = {
  currentTab: 'bun',
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
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case GET_INGREDIENT: {
      return {
        ...state,
        ingredient: [...state.items].find((item) => item._id === action.id),
      };
    }
    default: {
      return state;
    }
  }
};

export const constructorReducer = (state = constructorInitialState, action) => {
  return state;
};

export const orderReducer = (state = orderInitialState, action) => {
  return state;
};

export const modalReducer = (state = modalInitialState, action) => {
  switch (action.type) {
    case GET_MODAL_OPEN: {
      return {
        ...state,
        isVisible: true,
      };
    }
    case GET_MODAL_CLOSE: {
      return {
        ...state,
        isVisible: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const tabsReducer = (state = tabsInitialState, action) => {
  switch (action.type) {
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab:
          action.tabName === BUN
            ? BUN
            : action.tabName === SAUSECES
            ? SAUSECES
            : action.tabName === FILLING
            ? FILLING
            : '',
      };
    }

    default: {
      return state;
    }
  }
};
