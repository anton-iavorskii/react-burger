import { useEffect } from "react";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/ws";
import {
  TStore,
  useAppDispatch,
  useAppSelector,
} from "../../services/store-types";
import { WS_BASE_URL, feedPath } from "../../utils/consts";
import FeedOrdersStyles from "./feed-orders.module.css";
import { useLocation } from "react-router-dom";
import FeedItem from "../feed-item/feed-item";
import { Link } from "react-router-dom";

const FeedOrders = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const getDataStore = (store: TStore) => {
    return {
      orders: store.ws.orders,
    };
  };

  const { orders } = useAppSelector(getDataStore);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: WS_BASE_URL + "all",
    });

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED,
      });
    };
  }, [dispatch]);

  return (
    <>
      {orders.map((elem) => (
        <Link
          key={elem.number}
          to={`${feedPath}/${elem.number}`}
          style={{ width: "99%" }}
          state={{ background: location }}
        >
          <FeedItem
            createdAt={elem.createdAt}
            ingredients={elem.ingredients}
            name={elem.name}
            number={elem.number}
            status={elem.status}
            displayStatus={false}
          />
        </Link>
      ))}
    </>
  );
};

export default FeedOrders;
