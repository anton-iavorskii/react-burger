import { v4 as uuidv4 } from "uuid";
import { request } from "../../utils/request";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_INGREDIENT = "GET_INGREDIENT";

export const GET_CONSTRUCTOR_INGREDIENTS = "GET_CONSTRUCTOR_INGREDIENTS";
export const REORDER_CONSTRUCTOR_INGREDIENTS =
  "REORDER_CONSTRUCTOR_INGREDIENTS";
export const ADD_CONSTRUCTOR_INGREDIENT = "UPDATE_CONSTRUCTOR_INGREDIENTS";
export const DELETE_CONSTRUCTOR_INGREDIENT = "DELETE_CONSTRUCTOR_INGREDIENT";
export const DELETE_ALL_CONSTRUCTOR_INGREDIENTS =
  "DELETE_ALL_CONSTRUCTOR_INGREDIENTS";

export const GET_MODAL_ORDER_OPEN = "GET_MODAL_ORDER_OPEN";
export const GET_MODAL_ORDER_CLOSE = "GET_MODAL_ORDER_CLOSE";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    request("ingredients")
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}

export function getOrder(body) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    request("orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          item: res,
        });
        dispatch({
          type: DELETE_ALL_CONSTRUCTOR_INGREDIENTS,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}

export function addConstructorItem(item) {
  return {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    item: { ...item, key: uuidv4() },
  };
}
