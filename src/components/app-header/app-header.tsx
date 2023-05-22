import React from "react";
import { Link, useMatch } from "react-router-dom";

import AppHeaderStyles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { mainPath, profilePath } from "../../utils/consts";

const AppHeader = (): JSX.Element => {
  const matchMainPage = useMatch(mainPath);
  const matchProfilePage = useMatch({ path: profilePath, end: false });

  return (
    <header className={AppHeaderStyles.headerContainer}>
      <nav>
        <ul className={AppHeaderStyles.navContainer}>
          <li className="pr-5 pl-5 mt-4 mb-4 mr-2">
            <Link
              to={mainPath}
              style={{ display: "flex", alignItems: "center" }}
            >
              <BurgerIcon type={matchMainPage ? "primary" : "secondary"} />
              <span
                className={`ml-2 mt-4 mb-4 text text_type_main-default ${
                  !matchMainPage && "text_color_inactive"
                }`}
              >
                Конструктор
              </span>
            </Link>
          </li>
          <li className="pr-5 pl-5 mt-4 mb-4">
            <Link to="/feed" style={{ display: "flex", alignItems: "center" }}>
              <ListIcon type="secondary" />
              <span className="ml-2 mt-4 mb-4 text text_type_main-default text_color_inactive">
                Лента заказов
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <Link to={mainPath} className={AppHeaderStyles.logo}>
        <Logo />
      </Link>
      <div className="pr-5 pl-5 mt-4 mb-4">
        <Link
          to={profilePath}
          style={{ display: "flex", alignItems: "center" }}
        >
          <ProfileIcon type={matchProfilePage ? "primary" : "secondary"} />
          <span
            className={`ml-2 mt-4 mb-4 text text_type_main-default ${
              !matchProfilePage && "text_color_inactive"
            }`}
          >
            Личный кабинет
          </span>
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
