import { useEffect } from "react";
import {
  TStore,
  useAppDispatch,
  useAppSelector,
} from "../../services/store-types";
import { useLocation } from "react-router-dom";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/ws";

import ProfileOrdersPageStyle from "./profile-orders.module.css";
import { WS_BASE_URL } from "../../utils/consts";
import FeedItem from "../../components/feed-item/feed-item";
import { Link } from "react-router-dom";

const ProfileOrdersPage = (): JSX.Element => {
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
      payload:
        WS_BASE_URL +
        "?token=" +
        localStorage.getItem("accessToken")?.replace("Bearer ", ""),
    });

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED,
      });
    };
  }, [dispatch]);

  return (
    <div className={`custom-scroll ${ProfileOrdersPageStyle.container}`}>
      {orders.map((elem) => (
        <Link
          className={ProfileOrdersPageStyle.ordersLink}
          key={elem.number}
          to={`${elem.number}`}
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
    </div>
  );
};

export default ProfileOrdersPage;
