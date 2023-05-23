import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useMatch } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileStyles from "./profile.module.css";
import { logout, updateUser } from "../../services/actions/user";
import useForm from "../../hooks/useForm";
import {
  colorLink,
  mainPath,
  profileOrdersPath,
  profilePath,
} from "../../utils/consts";
import {
  TStore,
  useAppDispatch,
  useAppSelector,
} from "../../services/store-types";

type TProfileForm = {
  name: string | null;
  email: string | null;
};

const Profile = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const matchProfile = useMatch(profilePath);
  const matchOrders = useMatch(profilePath + "/" + profileOrdersPath);
  const isOrderPath = location.pathname.includes("order");
  const getDataStore = (store: TStore) => {
    return {
      user: store.user.user,
    };
  };
  const { user } = useAppSelector(getDataStore);
  const [isNewData, setIsNewData] = useState<boolean>(false);

  const { values, handleChange, setValues } = useForm<TProfileForm>({
    name: user ? user.name : null,
    email: user ? user.email : null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (values && values.name && values.email) {
      dispatch(
        updateUser({
          name: values.name,
          email: values.email,
        })
      );
    }
  };

  const handleCancelUpdate = () => {
    if (user) {
      setValues(user);
    }
  };

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    if (user && values) {
      if (user.name !== values.name || user.email !== values.email) {
        setIsNewData(true);
      } else {
        setIsNewData(false);
      }
    }
  }, [values, user]);

  return (
    <div className={ProfileStyles.container}>
      <section className={ProfileStyles.menu}>
        <span
          className={`text text_type_main-medium pt-4 pb-4 ${
            !matchProfile && "text_color_inactive"
          }`}
        >
          <Link to={profilePath}>Профиль</Link>
        </span>

        <span
          className={`text text_type_main-medium pt-4 pb-4 ${
            !matchOrders && "text_color_inactive"
          }`}
        >
          <Link to={profileOrdersPath}>История заказов</Link>
        </span>
        <span className="text text_type_main-medium pt-4 pb-4 text_color_inactive">
          <Link to={mainPath} onClick={handleLogout}>
            Выход
          </Link>
        </span>

        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете
          <br />
          {isOrderPath
            ? "посмотреть свою историю заказов"
            : "изменить свои персональные данные"}
        </p>
      </section>
      <section>
        <Outlet />
        {matchProfile && (
          <form className={ProfileStyles.form} onSubmit={handleSubmit}>
            <Input
              type={"text"}
              name={"name"}
              placeholder={"Имя"}
              icon={"EditIcon"}
              value={values?.name as string}
              onChange={handleChange}
            />
            <Input
              type={"email"}
              name={"email"}
              placeholder={"Логин"}
              icon={"EditIcon"}
              value={values?.email as string}
              onChange={handleChange}
            />
            <Input
              type={"password"}
              name={"password"}
              placeholder={"Пароль"}
              icon={"EditIcon"}
              value={""}
              onChange={handleChange}
            />
            {isNewData && (
              <div className={ProfileStyles.buttonsWrapper}>
                <span
                  className="text text_type_main-default"
                  style={{ color: colorLink, cursor: "pointer" }}
                  onClick={handleCancelUpdate}
                >
                  Отмена
                </span>
                <Button htmlType="submit" type="primary" size="medium">
                  Сохранить
                </Button>
              </div>
            )}
          </form>
        )}
      </section>
    </div>
  );
};

export default Profile;
