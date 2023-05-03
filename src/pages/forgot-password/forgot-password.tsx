import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import ForgotPasswordStyles from "./forgot-password.module.css";
import { colorLink, loginPath } from "../../utils/consts";
import useForm from "../../hooks/useForm";
import { forgotPassword } from "../../services/actions/user";

type TForgotPasswordForm = {
  email: string;
};

const ForgotPassword = (): JSX.Element => {
  const dispatch = useDispatch();
  // @ts-ignore   - todo: 5 sprint
  const getDataStore = (store) => {
    return {
      isPasswordForgot: store.user.isPasswordForgot,
    };
  };
  const { isPasswordForgot } = useSelector(getDataStore);

  const { values, handleChange } = useForm<TForgotPasswordForm>({
    email: "",
  });

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      // @ts-ignore   - todo: 5 sprint
      forgotPassword({
        email: values.email,
      })
    );
  };

  if (isPasswordForgot) {
    return <Navigate to="/reset-password" replace />;
  } else {
    return (
      <div className={ForgotPasswordStyles.container}>
        <span className={`text text_type_main-medium `}>
          Восстановление пароля
        </span>
        <form
          className={ForgotPasswordStyles.form}
          onSubmit={handleForgotPassword}
        >
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            name={"email"}
            size={"default"}
            extraClass="mt-6 mb-6"
            value={values.email}
            onChange={handleChange}
          />

          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
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

export default ForgotPassword;
