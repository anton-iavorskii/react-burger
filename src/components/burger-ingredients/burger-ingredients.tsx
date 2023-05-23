import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BUN, SAUSECES, FILLING } from "../../utils/consts";
import IngredientCard from "../ingredient-card/ingredient-card";
import { TIngredient } from "../../utils/types";
import { TStore, useAppSelector } from "../../services/store-types";

const BurgerIngredients = () => {
  const location = useLocation();
  const refFilling = useRef<HTMLHeadingElement>(null);
  const refBun = useRef<HTMLHeadingElement>(null);
  const refSauce = useRef<HTMLHeadingElement>(null);
  const refContainer = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState(BUN);
  const getDataStore = (store: TStore) => {
    return {
      items: store.allIngredients.items,
    };
  };
  const { items } = useAppSelector(getDataStore);

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

  const handleTabs = (tabName: string) => {
    setCurrentTab(tabName);
    if (tabName === BUN) {
      refBun.current &&
        refBun.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    if (tabName === SAUSECES) {
      refSauce.current &&
        refSauce.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    if (tabName === FILLING) {
      refFilling.current &&
        refFilling.current.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
    }
  };

  const sauces = useMemo(() => {
    return items.filter((item: TIngredient) => item.type === SAUSECES);
  }, [items]);

  const buns = useMemo(() => {
    return items.filter((item: TIngredient) => item.type === BUN);
  }, [items]);

  const fillings = useMemo(() => {
    return items.filter((item: TIngredient) => item.type === FILLING);
  }, [items]);

  const contentBuns = useMemo(() => {
    return buns.map((item: TIngredient, index: number) => {
      return (
        <Link
          to={`/ingredients/${item._id}`}
          state={{ background: location }}
          key={item._id}
        >
          <IngredientCard key={index} item={item} />
        </Link>
      );
    });
  }, [buns, location]);

  const contentSauces = useMemo(() => {
    return sauces.map((item: TIngredient, index: number) => {
      return (
        <Link
          to={`/ingredients/${item._id}`}
          state={{ background: location }}
          key={item._id}
        >
          <IngredientCard key={index} item={item} />{" "}
        </Link>
      );
    });
  }, [sauces, location]);

  const contentFillings = useMemo(() => {
    return fillings.map((item: TIngredient, index: number) => {
      return (
        <Link
          to={`/ingredients/${item._id}`}
          state={{ background: location }}
          key={item._id}
        >
          <IngredientCard key={index} item={item} />{" "}
        </Link>
      );
    });
  }, [fillings, location]);

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
      setCurrentTab(SAUSECES);
    } else if (
      inViewFillingsContainer &&
      !inViewSaucesContainer &&
      !inViewBunsContainer
    ) {
      setCurrentTab(FILLING);
    } else if (
      inViewBunsContainer &&
      !inViewFillingsContainer &&
      !inViewSaucesContainer
    ) {
      setCurrentTab(BUN);
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
        <div
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
        </div>
      </section>
    </>
  );
};

export default BurgerIngredients;
