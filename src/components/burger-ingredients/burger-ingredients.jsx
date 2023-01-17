import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import {
  Tab,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { dataIngredientsPropTypes } from '../../utils/common-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredients = ({ dataIngredients }) => {
  const bun = 'bun';
  const sauce = 'sauce';
  const filling = 'filling';
  const [current, setCurrent] = useState(bun);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [ingredient, setIngredient] = useState();

  const handleOpenModal = ({ id }) => {
    getIngredient(id);
    setIsVisibleModal(true);
  };

  const handleCloseModal = () => {
    setIsVisibleModal(false);
  };

  const getIngredient = (id) => {
    setIngredient(dataIngredients.find((item) => item._id === id));
  };

  const getAllBuns = () => {
    return dataIngredients.filter((item) => item.type === bun);
  };

  const getAllSauces = () => {
    return dataIngredients.filter((item) => item.type === sauce);
  };

  const getAllFilling = () => {
    return dataIngredients.filter((item) => item.type === filling);
  };

  const allBuns = useMemo(() => {
    return getAllBuns();
  }, [dataIngredients]);

  const allSauces = useMemo(() => {
    return getAllSauces();
  }, [dataIngredients]);

  const allFilling = useMemo(() => {
    return getAllFilling();
  }, [dataIngredients]);

  return (
    <>
      <section>
        <h1 className="pt-10 pb-5 text text_type_main-large">
          Соберите бургер
        </h1>
        <div className={`mb-10 ${BurgerIngredientsStyles.tabWrapper}`}>
          <Tab value={bun} active={current === bun} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value={sauce} active={current === sauce} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab
            value={filling}
            active={current === filling}
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
            {allBuns.map((item) => {
              return (
                <div
                  className={`pb-10 ${BurgerIngredientsStyles.productCard}`}
                  key={item._id}
                  onClick={() =>
                    handleOpenModal({ id: item._id, type: 'ingredients' })
                  }
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
            })}
          </div>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div
            className={`pt-6 pr-4 pl-4 ${BurgerIngredientsStyles.productsContainer}`}
          >
            {allSauces.map((item) => {
              return (
                <div
                  className={` pb-8 ${BurgerIngredientsStyles.productCard}`}
                  key={item._id}
                  onClick={() =>
                    handleOpenModal({ id: item._id, type: 'ingredients' })
                  }
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
            })}
          </div>
        </article>
      </section>
      {isVisibleModal && (
        <Modal handleCloseModal={handleCloseModal} isHeader>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};

BurgerIngredients.propTypes = {
  dataIngredients: PropTypes.arrayOf(dataIngredientsPropTypes.isRequired)
    .isRequired,
};

export default BurgerIngredients;
