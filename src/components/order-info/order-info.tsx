import { useEffect } from "react";
import { useParams } from "react-router";
import {
  TStore,
  useAppDispatch,
  useAppSelector,
} from "../../services/store-types";
import OrderInfoStyles from "./order-info.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrderIngredient } from "../../utils/types";
import { getOrderInfo } from "../../services/actions/ingredients";

const OrderInfo = (): JSX.Element => {
  const { number } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrderInfo(String(number)));
  }, [dispatch, number]);

  const getDataStore = (store: TStore) => {
    return {
      order: store.order.orderInfo,
      allIngredients: store.allIngredients.items,
    };
  };

  const { allIngredients, order } = useAppSelector(getDataStore);

  let orderIngredients: TOrderIngredient[] = [];
  order?.ingredients.forEach((currentItem) => {
    let currentIngredient = allIngredients.find(
      (item) => item._id === currentItem
    );
    if (currentIngredient) {
      if (
        orderIngredients.find((item) => item._id === currentIngredient?._id) ===
        undefined
      ) {
        let q = order?.ingredients.filter(
          (item) => item === currentIngredient?._id
        ).length;
        orderIngredients.push({ ...currentIngredient, quantityInOrder: q });
      }
    }
  });

  let orderSum = orderIngredients.reduce((sum, currentItem) => {
    return sum + currentItem.price * currentItem.quantityInOrder;
  }, 0);

  const formatStatus = (status: string | undefined) => {
    switch (status) {
      case "created":
        return "Создан";
      case "pending":
        return "Готовится";
      case "done":
        return "Выполнен";
      default:
        return "Неизвестен";
    }
  };

  return (
    <div className={OrderInfoStyles.container}>
      <div
        className={`${OrderInfoStyles.heading} text text_type_digits-default mb-10`}
      >
        #{order?.number}
      </div>
      <div className="text text_type_main-medium mb-3">{order?.name}</div>
      <div
        className={`${OrderInfoStyles.status} text text_type_main-default mb-15`}
      >
        {formatStatus(order?.status)}
      </div>
      <div className="text text_type_main-medium mb-6">Состав:</div>
      <div
        className={`custom-scroll ${OrderInfoStyles.ingredientsContainer} mb-10 pr-6`}
      >
        {orderIngredients.map((item) => (
          <div className={OrderInfoStyles.ingredient} key={item._id}>
            <div className={OrderInfoStyles.wrapperImgAndName}>
              <div className={OrderInfoStyles.preview}>
                <img
                  src={item.image}
                  className={OrderInfoStyles.previewImage}
                  alt={item.name}
                />
              </div>
              <div className={` text text_type_main-default ml-4`}>
                <p className={OrderInfoStyles.name}>{item.name}</p>
              </div>
            </div>
            <div className={OrderInfoStyles.ingredientTotal}>
              <div className="text text_type_digits-default mr-2">
                {item.quantityInOrder} x {item.price}
              </div>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={OrderInfoStyles.footer}>
        <div className="text text_type_main-default text_color_inactive">
          {order && <FormattedDate date={new Date(order.updatedAt)} />}
        </div>
        <div className={OrderInfoStyles.ingredientTotal}>
          <div className="text text_type_digits-default mr-2">{orderSum}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
