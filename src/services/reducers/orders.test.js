import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_FAILED,
} from "../actions/ingredients";
import { orderInitialState, orderReducer } from "./order";

const testOrder = {
  success: true,
  name: "Space флюоресцентный бургер",
  order: {
    number: 6879,
  },
};

export const testOrderInfo = {
  createdAt: "2023-06-03T09:30:50.739Z",
  ingredients: ["643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa0941"],
  name: "Space флюоресцентный бургер",
  number: 6879,
  status: "done",
  updatedAt: "2023-06-03T09:30:50.872Z",
  _id: "647b084a8a4b62001c85309f",
};

describe("check orders reducer", () => {
  test("check GET_ORDER_REQUEST", () => {
    expect(orderReducer(undefined, { type: GET_ORDER_REQUEST })).toEqual({
      ...orderInitialState,
      orderRequest: true,
    });
  });

  test("check GET_ORDER_SUCCESS", () => {
    expect(
      orderReducer(undefined, { type: GET_ORDER_SUCCESS, item: testOrder })
    ).toEqual({
      ...orderInitialState,
      orderFailed: false,
      order: testOrder,
      orderRequest: false,
    });
  });

  test("check GET_ORDER_FAILED", () => {
    expect(orderReducer(undefined, { type: GET_ORDER_FAILED })).toEqual({
      ...orderInitialState,
      itemsFailed: true,
      itemsRequest: false,
    });
  });

  test("check GET_ORDER_INFO_REQUEST", () => {
    expect(orderReducer(undefined, { type: GET_ORDER_INFO_REQUEST })).toEqual({
      ...orderInitialState,
      orderInfoRequest: true,
    });
  });

  test("check GET_ORDER_INFO_SUCCESS", () => {
    expect(
      orderReducer(undefined, {
        type: GET_ORDER_INFO_SUCCESS,
        item: testOrderInfo,
      })
    ).toEqual({
      ...orderInitialState,
      orderInfoFailed: false,
      orderInfo: testOrderInfo,
      orderInfoRequest: false,
    });
  });

  test("check GET_ORDER_INFO_FAILED", () => {
    expect(orderReducer(undefined, { type: GET_ORDER_INFO_FAILED })).toEqual({
      ...orderInitialState,
      orderInfoFailed: true,
      orderInfoRequest: false,
    });
  });
});
