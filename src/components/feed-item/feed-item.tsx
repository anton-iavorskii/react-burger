import { TStore, useAppSelector } from "../../services/store-types";
import { TIngredient } from "../../utils/types";
import FeedItemStyles from "./feed-item.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrdersFeedItem {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  displayStatus: boolean;
}

const FeedItem = ({
  createdAt,
  ingredients,
  name,
  number,
  status,
  displayStatus,
}: IOrdersFeedItem): JSX.Element => {
  const getDataStore = (store: TStore) => {
    return {
      items: store.allIngredients.items,
    };
  };
  const { items } = useAppSelector(getDataStore);

  let orderIngredients: TIngredient[] = [];
  ingredients.forEach((currentItem) => {
    let currentIngredient = items.find(
      (item: TIngredient) => item._id === currentItem
    );
    if (currentIngredient) {
      orderIngredients.push(currentIngredient);
    }
  });

  let previewIngredients = [];
  let restIngredients: number | null = null;
  if (orderIngredients.length > 5) {
    previewIngredients = orderIngredients.slice(0, 6);
    restIngredients = orderIngredients.length - 5;
  } else {
    previewIngredients = orderIngredients.slice();
  }

  let orderSum = orderIngredients.reduce((sum, currentItem) => {
    return sum + currentItem.price;
  }, 0);

  const formatStatus = (status: string) => {
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
    <div className={`${FeedItemStyles.container} p-6 mb-4`}>
      <div className={FeedItemStyles.heading}>
        <div className="text text_type_digits-default">#{number}</div>
        <div className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </div>
      </div>
      <div>
        <div className="text text_type_main-medium  mb-6 mt-6">{name}</div>
        {displayStatus && (
          <div className="text text_type_main-default mt-2">
            {formatStatus(status)}
          </div>
        )}
      </div>
      <div className={FeedItemStyles.details}>
        <div className={FeedItemStyles.ingredients}>
          {previewIngredients.map((item, index) => (
            <div
              className={FeedItemStyles.preview}
              key={number + item._id + index}
            >
              <img
                src={item.image}
                className={FeedItemStyles.previewImage}
                alt={item.name}
              />
              {index === 5 && (
                <div
                  className={`text text_type_main-default`}
                >{`+${restIngredients}`}</div>
              )}
            </div>
          ))}
        </div>
        <div className={FeedItemStyles.cost}>
          <div className="text text_type_digits-default mr-2">{orderSum}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
