import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useMatch } from 'react-router-dom';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileStyles from './profile.module.css';
import { logout, updateUser } from '../../services/actions/user';
import useForm from '../../hooks/useForm';
import { colorLink } from '../../utils/consts';

const Profile = () => {
  const dispatch = useDispatch();
  const matchProfile = useMatch('/profile');
  const matchOrders = useMatch('/profile/orders');

  const { user } = useSelector((store) => {
    return {
      user: store.user.user,
    };
  });
  const [isNewData, setIsNewData] = useState(false);

  const { values, handleChange, setValues } = useForm({
    name: user.name,
    email: user.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        name: values.name,
        email: values.email,
      })
    );
  };

  const handleCancelUpdate = () => {
    setValues(user);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    if (
      user.name !== values.name ||
      user.email !== values.email ||
      values.password
    ) {
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
            !matchProfile && 'text_color_inactive'
          }`}
        >
          <Link to="/profile">Профиль</Link>
        </span>

        <span
          className={`text text_type_main-medium pt-4 pb-4 ${
            !matchOrders && 'text_color_inactive'
          }`}
        >
          <Link to="orders">История заказов</Link>
        </span>
        <span className="text text_type_main-medium pt-4 pb-4 text_color_inactive">
          <Link to="/" onClick={handleLogout}>
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
              type={'text'}
              name={'name'}
              placeholder={'Имя'}
              icon={'EditIcon'}
              value={values.name}
              onChange={handleChange}
            />
            <Input
              type={'email'}
              name={'email'}
              placeholder={'Логин'}
              icon={'EditIcon'}
              value={values.email}
              onChange={handleChange}
            />
            <Input
              type={'password'}
              name={'password'}
              placeholder={'Пароль'}
              icon={'EditIcon'}
              value={''}
              onChange={handleChange}
            />
            {isNewData && (
              <div className={ProfileStyles.buttonsWrapper}>
                <span
                  className="text text_type_main-default"
                  style={{ color: colorLink, cursor: 'pointer' }}
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
