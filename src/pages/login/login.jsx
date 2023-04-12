import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import LoginStyles from './login.module.css';
import { colorLink, forgotPasswordPath, registerPath } from '../../utils/consts';
import { login} from '../../services/actions/user';
import useForm from '../../hooks/useForm';

const LoginPage = () => {
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      login({
        email: values.email,
        password: values.password,
      })
    );
  };

  return (
    <div className={LoginStyles.container}>
      <span className={`text text_type_main-medium `}>Вход</span>
      <form className={LoginStyles.form} onSubmit={handleLogin}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          name={'email'}
          size={'default'}
          extraClass="mt-6 mb-6"
          value={values.email}
          onChange={handleChange}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          name={'password'}
          size={'default'}
          icon={'ShowIcon'}
          extraClass="mb-6"
          value={values.password}
          onChange={handleChange}
        />
        <Button htmlType="submit" type="primary" size="large">
          Войти
        </Button>
      </form>
      <span className="text text_type_main-default mt-20 mb-4">
        Вы — новый пользователь?{' '}
        <Link to={registerPath} style={{ color: colorLink }}>
          Зарегистрироваться
        </Link>
      </span>
      <span className="text text_type_main-default">
        Забыли пароль?{' '}
        <Link to={forgotPasswordPath} style={{ color: colorLink }}>
          Восстановить пароль
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
