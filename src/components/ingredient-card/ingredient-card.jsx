import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import IngredientCardStyles from './ingredient-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { dataIngredientsPropTypes } from '../../utils/common-types';
import { BUN } from '../../utils/consts';

const IngredientCard = ({ item }) => {
  const getDataStore = (store) => {
    return {
      constructorItems: store.constructorBurger.constructorItems,
    };
  }
  const { constructorItems } = useSelector(getDataStore);

  const count = useMemo(() => {
    const itemsInBurger = constructorItems.filter(
      (elem) => elem._id === item._id
    );
    return itemsInBurger.length;
  }, [constructorItems]);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    !isDrag && (
      <div
        className={`pb-10 ${IngredientCardStyles.productCard}`}
        ref={dragRef}
        key={item._id}
      >
        {count !== 0 && (
          <span
            className={`text text_type_digits-default ${IngredientCardStyles.counter}`}
          >
            {item.type === BUN ? count * 2 : count}
          </span>
        )}
        <img className="mr-4 ml-4" src={item.image} alt="булка" />
        <div className={`mt-1 mb-1 ${IngredientCardStyles.priceContainer}`}>
          <span className="text text_type_digits-default mr-2">
            {item.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <span
          className={`text text_type_main-default ${IngredientCardStyles.productName}`}
        >
          {item.name}
        </span>
      </div>
    )
  );
};

export default IngredientCard;

IngredientCard.propTypes = {
  item: dataIngredientsPropTypes.isRequired,
};
