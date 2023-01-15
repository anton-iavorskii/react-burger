import React, { useEffect, useMemo, useState } from 'react';

import AppStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

const App = () => {
  const url = 'https://norma.nomoreparties.space/api/ingredients';
  const [dataIngredients, setDataIngredients] = useState();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [ingredient, setIngredient] = useState();
  const [typeModal, setTypeModal] = useState();

  const handleOpenModal = ({ id, type }) => {
    setTypeModal(type);
    getIngredient(id);
    setIsVisibleModal(true);
  };

  const handleCloseModal = () => {
    setIsVisibleModal(false);
  };

  const getDataIngredients = () => {
    fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        if (response.status !== 200) {
          return Promise.reject(new Error(response.statusText));
        }
        return Promise.resolve(response);
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setDataIngredients(data.data);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  const getIngredient = (id) => {
    setIngredient(dataIngredients.find((item) => item._id === id));
  };

  useEffect(() => {
    getDataIngredients();
  }, []);

  return (
    <>
      <AppHeader />
      {dataIngredients && (
        <main className={AppStyles.container}>
          <BurgerIngredients
            dataIngredients={dataIngredients}
            handleOpenModal={handleOpenModal}
          />
          <BurgerConstructor
            dataIngredients={dataIngredients}
            handleOpenModal={handleOpenModal}
          />
        </main>
      )}
      {isVisibleModal && (
        <Modal handleCloseModal={handleCloseModal} typeModal={typeModal}>
          {typeModal === 'order' && <OrderDetails />}
          {typeModal === 'ingredients' && (
            <IngredientDetails ingredient={ingredient} />
          )}
        </Modal>
      )}
    </>
  );
};

export default App;
