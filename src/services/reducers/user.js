import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  SET_USER,
  SET_AUTH_CHECKED,
} from '../actions/user';

export const userInitialState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  isPasswordForgot: false,
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case REGISTER_SUCCESS: {
      return {
        user: action.user,
        isAuthChecked: true,
        isLoading: false,
      };
    }

    case REGISTER_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        user: action.user,
        isAuthChecked: true,
        isLoading: false,
      };
    }

    case LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: action.user,
        isLoading: false,
      };
    }

    case LOGOUT_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isPasswordForgot: true,
        isLoading: false,
      };
    }

    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isPasswordForgot: false,
        isLoading: false,
      };
    }

    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
      };
    }

    case UPDATE_USER_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case SET_USER: {
      return {
        user: action.user,
        isLoading: false,
      };
    }

    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.checked,
      };
    }

    default: {
      return state;
    }
  }
};
