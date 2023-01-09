import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import {
  Tab,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredientsPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
});

const BurgerIngredients = ({ dataIngredients }) => {
  const [current, setCurrent] = React.useState('bun');
  return (
    <section>
      <h1 className="pt-10 pb-5 text text_type_main-large">Соберите бургер</h1>
      <div className={`mb-10 ${BurgerIngredientsStyles.tabWrapper}`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="filling"
          active={current === 'filling'}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <article
        className={`custom-scroll ${BurgerIngredientsStyles.articleContainer}`}
      >
        <h2 className="text text_type_main-medium">Булки</h2>
        <div
          className={`pt-6 pr-4 pl-4 ${BurgerIngredientsStyles.productsContainer}`}
        >
          {dataIngredients.map((item) => {
            if (item.type === 'bun') {
              return (
                <div
                  className={`pb-10 ${BurgerIngredientsStyles.productCard}`}
                  key={item._id}
                >
                  <img className="mr-4 ml-4" src={item.image} alt="булка" />
                  <div
                    className={`mt-1 mb-1 ${BurgerIngredientsStyles.priceContainer}`}
                  >
                    <span className="text text_type_digits-default mr-2">
                      {item.price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </div>
                  <span
                    className={`text text_type_main-default ${BurgerIngredientsStyles.productName}`}
                  >
                    {item.name}
                  </span>
                </div>
              );
            }
          })}
        </div>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <div
          className={`pt-6 pr-4 pl-4 ${BurgerIngredientsStyles.productsContainer}`}
        >
          {dataIngredients.map((item) => {
            if (item.type === 'sauce') {
              return (
                <div
                  className={` pb-8 ${BurgerIngredientsStyles.productCard}`}
                  key={item._id}
                >
                  <img className="mr-4 ml-4" src={item.image} alt="соус" />
                  <div
                    className={`mt-1 mb-1 ${BurgerIngredientsStyles.priceContainer}`}
                  >
                    <span className="text text_type_digits-default mr-2">
                      {item.price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </div>
                  <span
                    className={`text text_type_main-default ${BurgerIngredientsStyles.productName}`}
                  >
                    {item.name}
                  </span>
                </div>
              );
            }
          })}
        </div>
      </article>
    </section>
  );
};

BurgerIngredients.propTypes = {
  dataIngredients: PropTypes.arrayOf(BurgerIngredientsPropTypes).isRequired,
};

export default BurgerIngredients;
