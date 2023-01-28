import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_BUNS,
  GET_SAUCES,
  GET_FILLINGS,
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
  buns: [],
  sauces: [],
  fillings: [],
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
    case GET_BUNS: {
      return {
        ...state,
        buns: [...state.items].filter((item) => item.type === 'bun'),
      };
    }
    case GET_SAUCES: {
      return {
        ...state,
        sauces: [...state.items].filter((item) => item.type === 'sauce'),
      };
    }
    case GET_FILLINGS: {
      return {
        ...state,
        fillings: [...state.items].filter((item) => item.type === 'filling'),
      };
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
          action.tabName === 'bun'
            ? 'bun'
            : action.tabName === 'sauce'
            ? 'sauce'
            : action.tabName === 'filling'
            ? 'filling'
            : '',
      };
    }

    default: {
      return state;
    }
  }
};
