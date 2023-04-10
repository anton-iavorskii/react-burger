import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../app-header/app-header';
import { getIngredients } from '../../services/actions/ingredients';
import { checkUserAuth } from '../../services/actions/user';
import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ProfileOrdersPage from '../../pages/profile-orders/profile-orders';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleCloseModal = () => {
    navigate('/');
  };

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails />}
        />
        <Route
          path="/login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path="/forgotPassword"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/resetPassword"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route
            path="orders"
            element={<OnlyAuth component={<ProfileOrdersPage />} />}
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal handleCloseModal={handleCloseModal} isHeader>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
