import React from 'react';

import AppStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import dataIngredients from '../../utils/data';

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={AppStyles.container}>
        <BurgerIngredients dataIngredients={dataIngredients} />
        <BurgerConstructor dataIngredients={dataIngredients} />
      </main>
    </>
  );
};

export default App;
