import React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import './Header.scss'
import classNames from "classnames";
import { Path } from "../../types/pathName";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Cookies from "js-cookie";
import { actions } from "../../app/authSlice";

import Logo from "../../assets/images/Logo.svg";
import BurgerIco from "../../assets/icons/burger.svg";
import CloseIco from "../../assets/icons/cross.svg";
import CartIco from "../../assets/icons/cart.svg";
import HeartIco from "../../assets/icons/heart.svg";
import AccountIco from "../../assets/icons/person.svg";
import PhoneMenu from "../PhoneMenu/PhoneMenu";

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('header__nav-link', { 'header__is-active': isActive }
);

export const Header = () => {
  const [burger, setBurger] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = Cookies.get('refresh_token');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

useEffect(() => {
  if (!token?.length) {
    localStorage.setItem("isLoggedIn", "false");
    dispatch(actions.logout());
    navigate('/');
  }
},[token?.length])

  return (
    <div className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo">
          <img className="header__logo-img" src={Logo} alt="logo" />
        </Link>

        <div className="header__left">
          <div className="header__nav-item">
            <NavLink to={Path.Gallery} className={getLinkClass}>
              Іграшки
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to={Path.About} className={getLinkClass}>
              Про нас
            </NavLink>
          </div>
        </div>

        <div className="header__right">
          <div className="header__nav-item">
            <NavLink to={Path.Cart} className={getLinkClass}>
              <img src={CartIco} alt="" />
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to={Path.Favourites} className={getLinkClass}>
              <img src={HeartIco} alt="" />
            </NavLink>
          </div>

          {!isLoggedIn && (
              <div className="header__nav-item">
                <NavLink to={Path.Login} className={getLinkClass}>
                  <img src={AccountIco} alt="" />
                </NavLink>
              </div>
          )}

          {isLoggedIn && (
            <div className="header__nav-item">
              <NavLink to={Path.Account} className={getLinkClass}>
                <img src={AccountIco} alt="" />
              </NavLink>
            </div>
          )}
        </div>

        <div className="header__phone">
          <div className="header__nav-item">
            <NavLink to={Path.Cart} className={getLinkClass}>
              <img src={CartIco} alt="" />
            </NavLink>
          </div>

          <button
            type="button"
            className="header__burger"
            onBlur={() => setBurger(false)}
            onClick={() => {
              setBurger(!burger);
            }}
          >
            {!burger && (
              <img className="header__menu header__menu--open" src={BurgerIco} alt=""/>
            )}

            {burger && (
              <img className="header__menu header__menu--open" src={CloseIco} alt=""/>
            )}
          </button>
        </div>
      </div>

      <PhoneMenu burger={burger} />
    </div>
  );
};
