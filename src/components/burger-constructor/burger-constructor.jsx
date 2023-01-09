import React from 'react';
import PropTypes from 'prop-types';
import BurgerConstructorStyles from './burger-constructor.module.css';
import {
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructorPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
});

const BurgerConstructor = ({ dataIngredients }) => {
  const bun = dataIngredients.find(
    (item) => item.name === 'Краторная булка N-200i'
  );

  return (
    <section
      className={`pt-25 pr-4 pl-4 ml-10 ${BurgerConstructorStyles.wrapper}`}
    >
      <div className={BurgerConstructorStyles.constructorItemContainer}>
        <div className={`pl-8 ${BurgerConstructorStyles.constructorCard}`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + ' верх'}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <div className={`custom-scroll ${BurgerConstructorStyles.itemWrapper}`}>
          {dataIngredients.map((item) => {
            if (item.type !== 'bun') {
              return (
                <div
                  className={`${BurgerConstructorStyles.constructorCard}`}
                  key={item._id}
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
            }
          })}
        </div>
        <div className={`pl-8 ${BurgerConstructorStyles.constructorCard}`}>
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
          <span className={`text text_type_digits-medium mr-2`}>610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  dataIngredients: PropTypes.arrayOf(BurgerConstructorPropTypes).isRequired,
};

export default BurgerConstructor;
