import { v4 as uuidv4 } from "uuid";
import { request } from "../../utils/request";
import { string } from "prop-types";
import {
  TConstructorIngredient,
  TIngredient,
  TOrderResponse,
} from "../../utils/types";
import { AppThunk } from "../store-types";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

export const GET_ORDER_INFO_REQUEST: "GET_ORDER_INFO_REQUEST" =
  "GET_ORDER_INFO_REQUEST";
export const GET_ORDER_INFO_SUCCESS: "GET_ORDER_INFO_SUCCESS" =
  "GET_ORDER_INFO_SUCCESS";
export const GET_ORDER_INFO_FAILED: "GET_ORDER_INFO_FAILED" =
  "GET_ORDER_INFO_FAILED";

export const GET_INGREDIENT: "GET_INGREDIENT" = "GET_INGREDIENT";

export const REORDER_CONSTRUCTOR_INGREDIENTS: "REORDER_CONSTRUCTOR_INGREDIENTS" =
  "REORDER_CONSTRUCTOR_INGREDIENTS";
export const ADD_CONSTRUCTOR_INGREDIENT: "ADD_CONSTRUCTOR_INGREDIENT" =
  "ADD_CONSTRUCTOR_INGREDIENT";
export const DELETE_CONSTRUCTOR_INGREDIENT: "DELETE_CONSTRUCTOR_INGREDIENT" =
  "DELETE_CONSTRUCTOR_INGREDIENT";
export const DELETE_ALL_CONSTRUCTOR_INGREDIENTS: "DELETE_ALL_CONSTRUCTOR_INGREDIENTS" =
  "DELETE_ALL_CONSTRUCTOR_INGREDIENTS";

export const GET_MODAL_ORDER_OPEN: "GET_MODAL_ORDER_OPEN" =
  "GET_MODAL_ORDER_OPEN";
export const GET_MODAL_ORDER_CLOSE: "GET_MODAL_ORDER_CLOSE" =
  "GET_MODAL_ORDER_CLOSE";

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly items: TIngredient[];
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly item: TOrderResponse;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderInfoRequestAction {
  readonly type: typeof GET_ORDER_INFO_REQUEST;
}

export interface IGetOrderInfoSuccessAction {
  readonly type: typeof GET_ORDER_INFO_SUCCESS;
  readonly item: TOrderResponse;
}

export interface IGetOrderInfoFailedAction {
  readonly type: typeof GET_ORDER_INFO_FAILED;
}

export interface IGetIngredientAction {
  readonly type: typeof GET_INGREDIENT;
  readonly id: string;
}

export interface IReorderConstructorIngredientsAction {
  readonly type: typeof REORDER_CONSTRUCTOR_INGREDIENTS;
  readonly from: number;
  readonly to: number;
}

export interface IAddConstructorIngredientAction {
  readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
  readonly item: TConstructorIngredient;
}

export interface IDeleteConstructorIngredientAction {
  readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
  readonly index: number;
}

export interface IDeleteAllConstructorIngredientAction {
  readonly type: typeof DELETE_ALL_CONSTRUCTOR_INGREDIENTS;
}

export interface IGetModalOrderOpenAction {
  readonly type: typeof GET_MODAL_ORDER_OPEN;
}

export interface IGetModalOrderCloseAction {
  readonly type: typeof GET_MODAL_ORDER_CLOSE;
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IGetOrderInfoRequestAction
  | IGetOrderInfoSuccessAction
  | IGetOrderInfoFailedAction
  | IGetIngredientAction
  | IReorderConstructorIngredientsAction
  | IAddConstructorIngredientAction
  | IDeleteConstructorIngredientAction
  | IDeleteAllConstructorIngredientAction
  | IGetModalOrderOpenAction
  | IGetModalOrderCloseAction;

export function getIngredients(): AppThunk {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    request("ingredients", {})
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

export function getOrder(body: {
  ingredients: Array<string> | string[][];
}): AppThunk {
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

export function getOrderInfo(orderNumber: string): AppThunk {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_INFO_REQUEST,
    });
    request(`orders/${orderNumber}`, {})
      .then((res) => {
        dispatch({
          type: GET_ORDER_INFO_SUCCESS,
          item: res.orders[0],
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ORDER_INFO_FAILED,
        });
      });
  };
}

export function addConstructorItem(item: TConstructorIngredient) {
  return {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    item: { ...item, key: uuidv4() },
  };
}
