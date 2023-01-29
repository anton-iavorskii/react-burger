import React from 'react';
import { useDispatch } from 'react-redux';
import BurgerIngredientsStyles from './ingredient-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  GET_INGREDIENT,
  GET_MODAL_OPEN,
} from '../../services/actions/ingredients';

const IngredientCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleOpenModal = ({ id }) => {
    dispatch({ type: GET_INGREDIENT, id });
    dispatch({ type: GET_MODAL_OPEN });
  };

  return (
    <div
      className={`pb-10 ${BurgerIngredientsStyles.productCard}`}
      key={item._id}
      onClick={() => handleOpenModal({ id: item._id, type: 'ingredients' })}
    >
      <img className="mr-4 ml-4" src={item.image} alt="булка" />
      <div className={`mt-1 mb-1 ${BurgerIngredientsStyles.priceContainer}`}>
        <span className="text text_type_digits-default mr-2">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <span
        className={`text text_type_main-default ${BurgerIngredientsStyles.productName}`}
      >
        {item.name}
      </span>
    </div>
  );
};

export default IngredientCard;
