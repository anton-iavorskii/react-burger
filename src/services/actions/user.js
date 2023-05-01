import { fetchWithRefresh } from "../../utils/fetchWithRefresh";
import { request } from "../../utils/request";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const SET_USER = "SET_USER";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";

export const register = (body) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    request("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: REGISTER_SUCCESS,
          user: res.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_FAILED,
        });
      });
  };
};

export const login = (body) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    request("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: LOGIN_SUCCESS,
          user: res.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
};

export const logout = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    request("auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    })
      .then((res) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({
          type: LOGOUT_SUCCESS,
          user: null,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
};

export const forgotPassword = (body) => {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    request("password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
  };
};

export const resetPassword = (body) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    request("password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
};

export const updateUser = (body) => {
  body = JSON.stringify(body);
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });

    fetchWithRefresh("auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body,
    })
      .then((resData) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          user: resData.user,
        });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_USER_FAILED, user: null });
      });
  };
};

export const getUser = () => {
  return function (dispatch) {
    fetchWithRefresh("auth/user", {
      method: "GET",
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((resData) => {
        dispatch({
          type: SET_USER,
          user: resData.user,
        });
      })
      .catch((error) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({ type: SET_USER, user: null });
      })
      .finally(() => dispatch({ type: SET_AUTH_CHECKED, checked: true }));
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser());
    } else {
      dispatch({ type: SET_AUTH_CHECKED, checked: true });
    }
  };
};
