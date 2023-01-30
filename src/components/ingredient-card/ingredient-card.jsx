import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import IngredientCardStyles from './ingredient-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  GET_INGREDIENT,
  GET_MODAL_INGREDIENT_OPEN,
} from '../../services/actions/ingredients';
import { dataIngredientsPropTypes } from '../../utils/common-types';

const IngredientCard = ({ item }) => {
  const dispatch = useDispatch();

  const { constructorItems } = useSelector((store) => {
    return {
      constructorItems: store.allIngredients.constructorItems,
    };
  });

  const count = useMemo(() => {
    const itemsInBurger = constructorItems.filter(
      (elem) => elem._id === item._id
    );
    return itemsInBurger.length;
  }, [constructorItems]);

  const handleOpenModal = ({ id }) => {
    dispatch({ type: GET_INGREDIENT, id });
    dispatch({ type: GET_MODAL_INGREDIENT_OPEN });
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id: item._id },
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
        onClick={() => handleOpenModal({ id: item._id, type: 'ingredients' })}
      >
        {count !== 0 && (
          <span
            className={`text text_type_digits-default ${IngredientCardStyles.counter}`}
          >
            {count}
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
