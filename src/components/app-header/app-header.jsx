import React from 'react';
import { Link } from 'react-router-dom';

import AppHeaderStyles from './app-header.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={AppHeaderStyles.headerContainer}>
      <nav>
        <ul className={AppHeaderStyles.navContainer}>
          <li className="pr-5 pl-5 mt-4 mb-4 mr-2">
            <Link to="#" style={{ display: 'flex', alignItems: 'center' }}>
              <BurgerIcon type="primary" />
              <span className="ml-2 mt-4 mb-4 text text_type_main-default">
                Конструктор
              </span>
            </Link>
          </li>
          <li className="pr-5 pl-5 mt-4 mb-4">
            <Link to="#" style={{ display: 'flex', alignItems: 'center' }}>
              <ListIcon type="secondary" />
              <span className="ml-2 mt-4 mb-4 text text_type_main-default">
                Лента заказов
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <Link to="/" className={AppHeaderStyles.logo}>
        <Logo />
      </Link>
      <div className="pr-5 pl-5 mt-4 mb-4">
        <Link to="#" style={{ display: 'flex', alignItems: 'center' }}>
          <ProfileIcon type="secondary" />
          <span className="ml-2 mt-4 mb-4 text text_type_main-default">
            Личный кабинет
          </span>
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
