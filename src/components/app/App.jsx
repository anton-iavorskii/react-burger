import React, { useEffect, useMemo, useState } from 'react';

import AppStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import getFetch from '../../utils/getFetch.js';

const App = () => {
  const [dataIngredients, setDataIngredients] = useState();

  const getDataIngredients = async () => {
    const data = await getFetch('ingredients');
    setDataIngredients(data.data);
  };

  useEffect(() => {
    getDataIngredients();
  }, []);

  return (
    <>
      <AppHeader />
      {dataIngredients && (
        <main className={AppStyles.container}>
          <BurgerIngredients dataIngredients={dataIngredients} />
          <BurgerConstructor dataIngredients={dataIngredients} />
        </main>
      )}
    </>
  );
};

export default App;
