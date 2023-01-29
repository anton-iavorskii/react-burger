import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { getIngredients } from '../../services/actions/ingredients';

const App = () => {
  const dispatch = useDispatch();
  const { itemsRequest, itemsFailed } = useSelector((store) => {
    return {
      itemsRequest: store.allIngredients.itemsRequest,
      itemsFailed: store.allIngredients.itemsFailed,
    };
  });

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={AppStyles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
};

export default App;
