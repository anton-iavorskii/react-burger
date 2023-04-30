import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useMatch } from "react-router-dom";
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

type TProfileForm = {
  name: string;
  email: string;
};

const Profile = (): JSX.Element => {
  const dispatch = useDispatch();
  const matchProfile = useMatch(profilePath);
  const matchOrders = useMatch(profilePath + "/" + profileOrdersPath);
  // @ts-ignore   - todo: 5 sprint
  const getDataStore = (store) => {
    return {
      user: store.user.user,
    };
  };
  const { user } = useSelector(getDataStore);
  const [isNewData, setIsNewData] = useState<boolean>(false);

  const { values, handleChange, setValues } = useForm<TProfileForm>({
    name: user.name,
    email: user.email,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      // @ts-ignore   - todo: 5 sprint
      updateUser({
        name: values.name,
        email: values.email,
      })
    );
  };

  const handleCancelUpdate = () => {
    setValues(user);
  };

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore   - todo: 5 sprint
    dispatch(logout());
  };

  useEffect(() => {
    if (user.name !== values.name || user.email !== values.email) {
      setIsNewData(true);
    } else {
      setIsNewData(false);
    }
  }, [values]);

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
          изменить свои персональные данные
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
              value={values.name}
              onChange={handleChange}
            />
            <Input
              type={"email"}
              name={"email"}
              placeholder={"Логин"}
              icon={"EditIcon"}
              value={values.email}
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
