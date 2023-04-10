import React, { useCallback, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import RegisterStyles from './register.module.css';
import { colorLink } from '../../utils/consts';
import { useDispatch } from 'react-redux';
import { register } from '../../services/actions/user';
import useForm from '../../hooks/useForm';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
  };

  return (
    <div className={RegisterStyles.container}>
      <span className={`text text_type_main-medium `}>Регистрация</span>
      <form className={RegisterStyles.form} onSubmit={handleRegister}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          size={'default'}
          extraClass="mt-6"
          value={values.name}
          onChange={handleChange}
        />
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
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <span className="text text_type_main-default mt-20 mb-4">
        Уже зарегистрированы?{' '}
        <Link to="/login" style={{ color: colorLink }}>
          Войти
        </Link>
      </span>
    </div>
  );
};

export default RegisterPage;
