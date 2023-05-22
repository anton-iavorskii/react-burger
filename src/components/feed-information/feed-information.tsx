import { TOrder, TStore, useAppSelector } from "../../services/store-types";
import FeedInfoStyles from "./feed-information.module.css";

const FeedOInformation = (): JSX.Element => {
  const getDataStore = (store: TStore) => {
    return {
      orders: store.ws.orders,
      total: store.ws.total,
      totalToday: store.ws.totalToday,
    };
  };

  const { orders, total, totalToday } = useAppSelector(getDataStore);

  const ordersReady: TOrder[] = orders
    .filter((order: TOrder) => order.status === "done")
    .slice(0, 20);
  const ordersInProgress: TOrder[] = orders
    .filter((order: TOrder) => order.status === "pending")
    .slice(0, 20);

  return (
    <div className={FeedInfoStyles.container}>
      <div className={FeedInfoStyles.statuses}>
        <div className={FeedInfoStyles.status}>
          <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
          <div
            className={`${FeedInfoStyles.statusReady} text text_type_digits-default`}
          >
            <div className={FeedInfoStyles.numbers}>
              {ordersReady.map((item) => (
                <div key={item._id}>{item.number}</div>
              ))}
            </div>
          </div>
        </div>
        <div className={FeedInfoStyles.ordersDashboardStatus}>
          <h2 className="text text_type_main-medium pb-6">В работе:</h2>
          <div className="text text_type_digits-default">
            <div className={FeedInfoStyles.orderDashboardNumbers}>
              {ordersInProgress.map((item) => (
                <div key={item._id}>{item.number}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h2 className="text text_type_main-medium mt-15">
        Выполнено за все время:
      </h2>
      <h2 className="text text_type_digits-large">{total}</h2>
      <h2 className="text text_type_main-medium mt-15">
        Выполнено за сегодня:
      </h2>
      <h2 className="text text_type_digits-large">{totalToday}</h2>
    </div>
  );
};

export default FeedOInformation;
