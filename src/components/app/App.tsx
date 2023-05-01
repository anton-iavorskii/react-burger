import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../app-header/app-header";
import { getIngredients } from "../../services/actions/ingredients";
import { checkUserAuth } from "../../services/actions/user";
import MainPage from "../../pages/main/main";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProfileOrdersPage from "../../pages/profile-orders/profile-orders";
import {
  mainPath,
  loginPath,
  registerPath,
  forgotPasswordPath,
  resetPasswordPath,
  profilePath,
  profileOrdersPath,
  ingredientsIdPath,
} from "../../utils/consts";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleCloseModal = (): void => {
    navigate(mainPath);
  };

  useEffect(() => {
    // @ts-ignore   - todo: 5 sprint
    dispatch(checkUserAuth());
    // @ts-ignore  - todo: 5 sprint
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background}>
        <Route path={mainPath} element={<MainPage />} />
        <Route path={ingredientsIdPath} element={<IngredientDetails />} />
        <Route
          path={loginPath}
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path={registerPath}
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path={forgotPasswordPath}
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path={resetPasswordPath}
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route
          path={profilePath}
          element={<OnlyAuth component={<Profile />} />}
        >
          <Route
            path={profileOrdersPath}
            element={<OnlyAuth component={<ProfileOrdersPage />} />}
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path={ingredientsIdPath}
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
