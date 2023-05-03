import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

const ProtectedRoute = ({
  onlyUnAuth = false,
  component,
}: ProtectedRouteProps): JSX.Element | null => {
  const location = useLocation();
  // @ts-ignore  - todo: 5 sprint
  const getDataStore = (store) => {
    return {
      user: store.user.user,
      isAuthChecked: store.user.isAuthChecked,
    };
  };
  const { isAuthChecked, user } = useSelector(getDataStore);

  if (!isAuthChecked) {
    // Запрос еще выполняется
    return null; // или прелоадер
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
    // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    // Сервер не ответил
    return <Navigate to="/login" state={{ from: location }} />;
  }

  /* !onlyUnAuth && user */
  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: ProtectedRouteProps) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);
