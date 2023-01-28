import React from 'react';

import AppStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

const App = () => {
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
