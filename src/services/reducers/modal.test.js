import {
  GET_MODAL_ORDER_OPEN,
  GET_MODAL_ORDER_CLOSE,
} from "../actions/ingredients";
import { modalInitialState, modalReducer } from "./modal";

describe("check modal reducer", () => {
  test("check GET_MODAL_ORDER_OPEN", () => {
    expect(modalReducer(undefined, { type: GET_MODAL_ORDER_OPEN })).toEqual({
      ...modalInitialState,
      isVisibleOrderModal: true,
    });
  });

  test("check GET_MODAL_ORDER_CLOSE", () => {
    expect(modalReducer(undefined, { type: GET_MODAL_ORDER_CLOSE })).toEqual({
      ...modalInitialState,
      isVisibleOrderModal: false,
    });
  });
});
