import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_FAILED,
  WS_GET_MESSAGE,
} from "../actions/ws";
import { testOrderInfo } from "./orders.test";
import { wsInitialState, wsReducer } from "./ws";

const testMessage = {
  orders: [testOrderInfo],
  total: 6506,
  totalToday: 226,
};

describe("check ws reducer", () => {
  test("check WS_CONNECTION_SUCCESS", () => {
    expect(wsReducer(undefined, { type: WS_CONNECTION_SUCCESS })).toEqual({
      ...wsInitialState,
      wsConnected: true,
    });
  });

  test("check WS_CONNECTION_CLOSED", () => {
    expect(wsReducer(undefined, { type: WS_CONNECTION_CLOSED })).toEqual({
      ...wsInitialState,
      wsConnected: false,
    });
  });

  test("check WS_CONNECTION_FAILED", () => {
    expect(
      wsReducer(undefined, {
        type: WS_CONNECTION_FAILED,
        payload: { error: "test" },
      })
    ).toEqual({
      ...wsInitialState,
      error: { error: "test" },
      wsConnected: false,
    });
  });

  test("check WS_GET_MESSAGE", () => {
    expect(
      wsReducer(undefined, {
        type: WS_GET_MESSAGE,
        payload: testMessage,
      })
    ).toEqual({
      ...wsInitialState,
      orders: testMessage.orders,
      total: testMessage.total,
      totalToday: testMessage.totalToday,
    });
  });
});
