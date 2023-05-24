import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TIngredientsActions } from "./actions/ingredients";
import { TUserAction } from "./actions/user";
import { store } from "../index";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { TConstructorIngredient, TIngredient } from "../utils/types";
import {
  TWSActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_FAILED,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "./actions/ws";

export type TAppActions = TIngredientsActions | TUserAction | TWSActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;
export type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TAppActions
>;

export type TWS = {
  wsInit: typeof WS_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_FAILED;
  onMessage: typeof WS_GET_MESSAGE;
};

export type TConstructorState = {
  constructorItems: Array<TConstructorIngredient>;
};

export type TAllIngredientsState = {
  items: Array<TIngredient>;
  itemsRequest: boolean;
  itemsFailed: boolean;
  ingredient: TIngredient | null;
};

export type TModalState = {
  isVisibleOrderModal: boolean;
};

export type TOrderState = {
  order: {
    success: boolean;
    name: string;
    order: {
      number: number;
    };
  } | null;
  orderRequest: boolean;
  orderFailed: boolean;
  orderInfo: TOrder | null;
  orderInfoRequest: boolean;
  orderInfoFailed: boolean;
};

export type TUserState = {
  user: {
    email: string;
    name: string;
  } | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  isPasswordForgot: boolean;
};

export type TOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TWSMessage = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TWSState = {
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  wsConnected: boolean;
  error?: Event;
};

export type TStore = {
  allIngredients: TAllIngredientsState;
  constructorBurger: TConstructorState;
  modal: TModalState;
  order: TOrderState;
  user: TUserState;
  ws: TWSState;
};
