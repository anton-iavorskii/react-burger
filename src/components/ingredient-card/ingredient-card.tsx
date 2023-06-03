import { useMemo } from "react";
import { useDrag } from "react-dnd";

import IngredientCardStyles from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BUN } from "../../utils/consts";
import { TIngredient, TConstructorIngredient } from "../../utils/types";
import { TStore, useAppSelector } from "../../services/store-types";

type IngredientCardProps = { item: TIngredient; key: number };

const IngredientCard = ({ item }: IngredientCardProps): JSX.Element => {
  const getDataStore = (store: TStore) => {
    return {
      constructorItems: store.constructorBurger.constructorItems,
    };
  };
  const { constructorItems } = useAppSelector(getDataStore);

  const count = useMemo(() => {
    const itemsInBurger = constructorItems.filter(
      (elem: TConstructorIngredient) => elem._id === item._id
    );
    return itemsInBurger.length;
  }, [constructorItems, item]);

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return !isDrag ? (
    <div
      className={`pb-10 ${IngredientCardStyles.productCard}`}
      ref={dragRef}
      key={item._id}
      data-testid={"dragElement"}
    >
      {count !== 0 && (
        <span
          className={`text text_type_digits-default ${IngredientCardStyles.counter}`}
        >
          {item.type === BUN ? count * 2 : count}
        </span>
      )}
      <img className="mr-4 ml-4" src={item.image} alt={item.name} />
      <div className={`mt-1 mb-1 ${IngredientCardStyles.priceContainer}`}>
        <span className="text text_type_digits-default mr-2">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <span
        className={`text text_type_main-default ${IngredientCardStyles.productName}`}
      >
        {item.name}
      </span>
    </div>
  ) : (
    <></>
  );
};

export default IngredientCard;
