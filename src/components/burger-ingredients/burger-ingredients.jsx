import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import {
  Tab,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {
  getIngredients,
  GET_BUNS,
  GET_FILLINGS,
  GET_SAUCES,
  GET_INGREDIENT,
  GET_MODAL_OPEN,
  GET_MODAL_CLOSE,
  TAB_SWITCH,
} from '../../services/actions/ingredients';
import { BUN, SAUSECES, FILLING } from '../../utils/consts';

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const {
    items,
    itemsRequest,
    itemsFailed,
    buns,
    sauces,
    fillings,
    ingredient,
    isVisibleModal,
    currentTab,
  } = useSelector((store) => {
    return {
      items: store.allIngredients.items,
      itemsRequest: store.allIngredients.itemsRequest,
      itemsFailed: store.allIngredients.itemsFailed,
      buns: store.allIngredients.buns,
      sauces: store.allIngredients.sauces,
      fillings: store.allIngredients.fillings,
      ingredient: store.allIngredients.ingredient,
      isVisibleModal: store.modal.isVisible,
      currentTab: store.tabs.currentTab,
    };
  });

  const handleTabs = (tabName) => {
    dispatch({ type: TAB_SWITCH, tabName });
  };

  const handleOpenModal = ({ id }) => {
    dispatch({ type: GET_INGREDIENT, id });
    dispatch({ type: GET_MODAL_OPEN });
  };

  const handleCloseModal = () => {
    dispatch({ type: GET_MODAL_CLOSE });
  };

  useMemo(() => {
    dispatch({ type: GET_BUNS });
    dispatch({ type: GET_SAUCES });
    dispatch({ type: GET_FILLINGS });
  }, [items]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <section>
        <h1 className="pt-10 pb-5 text text_type_main-large">
          Соберите бургер
        </h1>
        <div className={`mb-10 ${BurgerIngredientsStyles.tabWrapper}`}>
          <Tab value={BUN} active={currentTab === BUN} onClick={handleTabs}>
            Булки
          </Tab>
          <Tab
            value={SAUSECES}
            active={currentTab === SAUSECES}
            onClick={handleTabs}
          >
            Соусы
          </Tab>
          <Tab
            value={FILLING}
            active={currentTab === FILLING}
            onClick={handleTabs}
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
            {buns?.map((item) => {
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
            {sauces.map((item) => {
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

export default BurgerIngredients;
