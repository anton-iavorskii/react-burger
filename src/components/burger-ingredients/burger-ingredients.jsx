import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {
  GET_MODAL_CLOSE,
  TAB_SWITCH,
} from '../../services/actions/ingredients';
import { BUN, SAUSECES, FILLING } from '../../utils/consts';
import IngredientCard from '../ingredient-card/ingredient-card';

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const { items, ingredient, isVisibleModal, currentTab } = useSelector(
    (store) => {
      return {
        items: store.allIngredients.items,
        itemsRequest: store.allIngredients.itemsRequest,
        itemsFailed: store.allIngredients.itemsFailed,
        ingredient: store.allIngredients.ingredient,
        isVisibleModal: store.modal.isVisible,
        currentTab: store.tabs.currentTab,
      };
    }
  );

  const handleTabs = (tabName) => {
    dispatch({ type: TAB_SWITCH, tabName });
  };

  const handleCloseModal = () => {
    dispatch({ type: GET_MODAL_CLOSE });
  };

  const sauces = useMemo(() => {
    return items.filter((item) => item.type === SAUSECES);
  }, [items]);

  const buns = useMemo(() => {
    return items.filter((item) => item.type === BUN);
  }, [items]);

  const fillings = useMemo(() => {
    return items.filter((item) => item.type === FILLING);
  }, [items]);

  const contentBuns = useMemo(() => {
    return buns.map((item, index) => {
      return <IngredientCard key={index} item={item} />;
    });
  }, [buns]);

  const contentSauces = useMemo(() => {
    return sauces.map((item, index) => {
      return <IngredientCard key={index} item={item} />;
    });
  }, [sauces]);

  const contentFillings = useMemo(() => {
    return fillings.map((item, index) => {
      return <IngredientCard key={index} item={item} />;
    });
  }, [fillings]);

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
            {contentBuns}
          </div>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div
            className={`pt-6 pr-4 pl-4 ${BurgerIngredientsStyles.productsContainer}`}
          >
            {contentSauces}
          </div>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div
            className={`pt-6 pr-4 pl-4 ${BurgerIngredientsStyles.productsContainer}`}
          >
            {contentFillings}
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
