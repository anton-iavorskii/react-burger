import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {
  TAB_SWITCH,
  GET_MODAL_INGREDIENT_CLOSE,
} from '../../services/actions/ingredients';
import { BUN, SAUSECES, FILLING } from '../../utils/consts';
import IngredientCard from '../ingredient-card/ingredient-card';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const refFilling = useRef(null);
  const refBun = useRef(null);
  const refSauce = useRef(null);
  const refContainer = useRef(null);

  const { items, ingredient, isVisibleModal, currentTab } = useSelector(
    (store) => {
      return {
        items: store.allIngredients.items,
        itemsRequest: store.allIngredients.itemsRequest,
        itemsFailed: store.allIngredients.itemsFailed,
        ingredient: store.allIngredients.ingredient,
        isVisibleModal: store.modal.isVisibleIngredientModal,
        currentTab: store.tabs.currentTab,
      };
    }
  );

  const [refBunsContainer, inViewBunsContainer] = useInView({
    root: refContainer.current,
    threshold: 1,
  });

  const [refSaucesContainer, inViewSaucesContainer] = useInView({
    root: refContainer.current,
    threshold: 1,
  });

  const [refFillingsContainer, inViewFillingsContainer] = useInView({
    root: refContainer.current,
    threshold: 0.4,
  });

  const handleCloseModal = () => {
    dispatch({ type: GET_MODAL_INGREDIENT_CLOSE });
  };

  const handleTabs = (tabName) => {
    dispatch({ type: TAB_SWITCH, tabName });
    if (tabName === BUN) {
      refBun.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    if (tabName === SAUSECES) {
      refSauce.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    if (tabName === FILLING) {
      refFilling.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
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

  useEffect(() => {
    if (
      inViewBunsContainer &&
      inViewSaucesContainer &&
      inViewFillingsContainer
    ) {
      return;
    }
    if (
      inViewSaucesContainer &&
      !inViewFillingsContainer &&
      !inViewBunsContainer
    ) {
      dispatch({ type: TAB_SWITCH, tabName: SAUSECES });
    } else if (
      inViewFillingsContainer &&
      !inViewSaucesContainer &&
      !inViewBunsContainer
    ) {
      dispatch({ type: TAB_SWITCH, tabName: FILLING });
    } else if (
      inViewBunsContainer &&
      !inViewFillingsContainer &&
      !inViewSaucesContainer
    ) {
      dispatch({ type: TAB_SWITCH, tabName: BUN });
    }
  }, [inViewSaucesContainer, inViewFillingsContainer, inViewBunsContainer]);

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
          ref={refContainer}
        >
          <div ref={refBunsContainer}>
            <h2 className="text text_type_main-medium" ref={refBun}>
              Булки
            </h2>
            <div
              className={`pt-6 pr-4 pl-4 ${BurgerIngredientsStyles.productsContainer}`}
            >
              {contentBuns}
            </div>
          </div>
          <div ref={refSaucesContainer}>
            <h2 className="text text_type_main-medium" ref={refSauce}>
              Соусы
            </h2>
            <div
              className={`pt-6 pr-4 pl-4 ${BurgerIngredientsStyles.productsContainer}`}
            >
              {contentSauces}
            </div>
          </div>
          <div ref={refFillingsContainer}>
            <h2 className="text text_type_main-medium" ref={refFilling}>
              Начинки
            </h2>
            <div
              className={`pt-6 pr-4 pl-4 ${BurgerIngredientsStyles.productsContainer}`}
            >
              {contentFillings}
            </div>
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
