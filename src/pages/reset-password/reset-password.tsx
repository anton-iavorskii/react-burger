import React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import ResetPasswordStyles from "./reset-password.module.css";
import { colorLink, loginPath } from "../../utils/consts";
import { resetPassword } from "../../services/actions/user";
import useForm from "../../hooks/useForm";
import {
  TStore,
  useAppDispatch,
  useAppSelector,
} from "../../services/store-types";

type TResetPasswordForm = {
  token: string;
  password: string;
};

const ResetPassword = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const getDataStore = (store: TStore) => {
    return {
      isPasswordForgot: store.user.isPasswordForgot,
    };
  };
  const { isPasswordForgot } = useAppSelector(getDataStore);

  const { values, handleChange } = useForm<TResetPasswordForm>({
    password: "",
    token: "",
  });

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        password: values.password,
        token: values.token,
      })
    );
  };

  if (!isPasswordForgot) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <div className={ResetPasswordStyles.container}>
        <span className={`text text_type_main-medium `}>
          Восстановление пароля
        </span>
        <form
          className={ResetPasswordStyles.form}
          onSubmit={handleResetPassword}
        >
          <Input
            type={"password"}
            placeholder={"Введите новый пароль"}
            name={"password"}
            size={"default"}
            icon={"ShowIcon"}
            extraClass="mb-6 mt-6"
            value={values.password}
            onChange={handleChange}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            name={"token"}
            size={"default"}
            extraClass="mb-6"
            value={values.token} //код из письма
            onChange={handleChange}
          />

          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <span className="text text_type_main-default mt-20 mb-4">
          Вспомнили пароль?{" "}
          <Link to={loginPath} style={{ color: colorLink }}>
            Войти
          </Link>
        </span>
      </div>
    );
  }
};

export default ResetPassword;
