import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
  feedPath,
  feedPathNumber,
  profileOrdersPathNumber,
} from "../../utils/consts";
import { useAppDispatch } from "../../services/store-types";
import FeedPage from "../../pages/feed/feed";
import OrderInfo from "../order-info/order-info";

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleCloseModal = (): void => {
    navigate(background);
  };

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={mainPath} element={<MainPage />} />
        <Route path={ingredientsIdPath} element={<IngredientDetails />} />
        <Route path={feedPathNumber} element={<OrderInfo />} />
        <Route path={feedPath} element={<FeedPage />} />
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
        <Route
          path={profilePath + "/" + profileOrdersPathNumber}
          element={<OnlyAuth component={<OrderInfo />} />}
        />
      </Routes>
      {background && (
        <>
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
          <Routes>
            <Route
              path={feedPathNumber}
              element={
                <Modal handleCloseModal={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
          <Routes>
            <Route
              path={profilePath + "/" + profileOrdersPathNumber}
              element={
                <OnlyAuth
                  component={
                    <Modal handleCloseModal={handleCloseModal}>
                      <OrderInfo />
                    </Modal>
                  }
                />
              }
            />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
