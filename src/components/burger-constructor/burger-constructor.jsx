import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import BurgerConstructorStyles from './burger-constructor.module.css';
import {
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  dataIngredientsPropTypes,
  handleOpenModalPropTypes,
} from '../../utils/common-types';

const BurgerConstructor = ({ dataIngredients, handleOpenModal }) => {
  const getBun = () => {
    return dataIngredients.find((item) => item.type === 'bun');
  };

  const getIngridients = () => {
    return dataIngredients.filter((item) => item.type !== 'bun');
  };

  const getTotalSum = () => {
    let result = 0;
    dataIngredients.forEach((item) => {
      result += item.price;
    });
    return result;
  };

  const bun = useMemo(() => {
    return getBun();
  }, [dataIngredients]);

  const ingridients = useMemo(() => {
    return getIngridients();
  }, [dataIngredients]);

  const totalSum = useMemo(() => {
    return getTotalSum();
  }, [dataIngredients]);

  return (
    <section
      className={`pt-25 pr-4 pl-4 ml-10 ${BurgerConstructorStyles.wrapper}`}
    >
      <div className={BurgerConstructorStyles.constructorItemContainer}>
        <div
          className={`pl-8 ${BurgerConstructorStyles.constructorCard}`}
          onClick={() => handleOpenModal({ id: bun._id, type: 'ingredients' })}
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + ' верх'}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <div className={`custom-scroll ${BurgerConstructorStyles.itemWrapper}`}>
          {ingridients.map((item) => {
            return (
              <div
                className={`${BurgerConstructorStyles.constructorCard}`}
                key={item._id}
                onClick={() =>
                  handleOpenModal({ id: item._id, type: 'ingredients' })
                }
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  extraClass="mr-2 ml-2"
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            );
          })}
        </div>
        <div
          className={`pl-8 ${BurgerConstructorStyles.constructorCard}`}
          onClick={() => handleOpenModal({ id: bun._id, type: 'ingredients' })}
        >
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + ' низ'}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className={`mt-10 ${BurgerConstructorStyles.bottomBlockContainer}`}>
        <div className={`mr-10 ${BurgerConstructorStyles.totalContainer}`}>
          <span className={`text text_type_digits-medium mr-2`}>
            {totalSum}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => handleOpenModal({ id: bun._id, type: 'order' })}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  dataIngredients: PropTypes.arrayOf(dataIngredientsPropTypes.isRequired)
    .isRequired,
  handleOpenModal: handleOpenModalPropTypes.isRequired,
};

export default BurgerConstructor;
