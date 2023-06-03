import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
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
} from "../actions/user";
import { userReducer, userInitialState } from "./user";

const userTest = {
  email: "test@test.ru",
  name: "test",
};

const userRegisterTest = {
  email: "test@test.ru",
  password: "test",
};

describe("check user reducer", () => {
  test("check REGISTER_REQUEST", () => {
    expect(userReducer(undefined, { type: REGISTER_REQUEST })).toEqual({
      ...userInitialState,
      isLoading: true,
    });
  });

  test("check REGISTER_SUCCESS", () => {
    expect(
      userReducer(undefined, { type: REGISTER_SUCCESS, user: userTest })
    ).toEqual({
      user: userTest,
      isAuthChecked: true,
      isLoading: false,
    });
  });

  test("check REGISTER_FAILED", () => {
    expect(userReducer(undefined, { type: REGISTER_FAILED })).toEqual({
      ...userInitialState,
      isLoading: false,
    });
  });

  test("check LOGIN_REQUEST", () => {
    expect(userReducer(undefined, { type: LOGIN_REQUEST })).toEqual({
      ...userInitialState,
      isLoading: true,
    });
  });

  test("check LOGIN_SUCCESS", () => {
    expect(
      userReducer(undefined, { type: LOGIN_SUCCESS, user: userTest })
    ).toEqual({
      user: userTest,
      isAuthChecked: true,
      isLoading: false,
    });
  });

  test("check LOGIN_FAILED", () => {
    expect(userReducer(undefined, { type: LOGIN_FAILED })).toEqual({
      ...userInitialState,
      isLoading: false,
    });
  });

  test("check LOGOUT_REQUEST ", () => {
    expect(userReducer(undefined, { type: LOGOUT_REQUEST })).toEqual({
      ...userInitialState,
      isLoading: true,
    });
  });

  test("check LOGOUT_SUCCESS", () => {
    expect(
      userReducer(undefined, { type: LOGOUT_SUCCESS, user: null })
    ).toEqual({
      ...userInitialState,
      user: null,
      isLoading: false,
    });
  });

  test("check LOGOUT_FAILED", () => {
    expect(userReducer(undefined, { type: LOGOUT_FAILED })).toEqual({
      ...userInitialState,
      isLoading: false,
    });
  });

  test("check FORGOT_PASSWORD_REQUEST ", () => {
    expect(userReducer(undefined, { type: FORGOT_PASSWORD_REQUEST })).toEqual({
      ...userInitialState,
      isLoading: true,
    });
  });

  test("check FORGOT_PASSWORD_SUCCESS", () => {
    expect(userReducer(undefined, { type: FORGOT_PASSWORD_SUCCESS })).toEqual({
      ...userInitialState,
      isPasswordForgot: true,
      isLoading: false,
    });
  });

  test("check FORGOT_PASSWORD_FAILED", () => {
    expect(userReducer(undefined, { type: FORGOT_PASSWORD_FAILED })).toEqual({
      ...userInitialState,
      isLoading: false,
    });
  });

  test("check RESET_PASSWORD_REQUEST ", () => {
    expect(userReducer(undefined, { type: RESET_PASSWORD_REQUEST })).toEqual({
      ...userInitialState,
      isLoading: true,
    });
  });

  test("check RESET_PASSWORD_SUCCESS", () => {
    expect(userReducer(undefined, { type: RESET_PASSWORD_SUCCESS })).toEqual({
      ...userInitialState,
      isPasswordForgot: false,
      isLoading: false,
    });
  });

  test("check RESET_PASSWORD_FAILED", () => {
    expect(userReducer(undefined, { type: RESET_PASSWORD_FAILED })).toEqual({
      ...userInitialState,
      isLoading: false,
    });
  });

  test("check UPDATE_USER_REQUEST ", () => {
    expect(userReducer(undefined, { type: UPDATE_USER_REQUEST })).toEqual({
      ...userInitialState,
      isLoading: true,
    });
  });

  test("check UPDATE_USER_SUCCESS", () => {
    expect(
      userReducer(undefined, { type: UPDATE_USER_SUCCESS, user: userTest })
    ).toEqual({
      ...userInitialState,
      user: userTest,
    });
  });

  test("check UPDATE_USER_FAILED", () => {
    expect(userReducer(undefined, { type: UPDATE_USER_FAILED })).toEqual({
      ...userInitialState,
      isLoading: false,
    });
  });

  test("check SET_USER", () => {
    expect(userReducer(undefined, { type: SET_USER, user: userTest })).toEqual({
      user: userTest,
      isLoading: false,
    });
  });

  test("check SET_AUTH_CHECKED", () => {
    expect(
      userReducer(undefined, { type: SET_AUTH_CHECKED, checked: true })
    ).toEqual({
      ...userInitialState,
      isAuthChecked: true,
    });
  });
});
