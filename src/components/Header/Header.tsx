import { Link, NavLink, useNavigate } from "react-router-dom";
import './Header.scss'
import classNames from "classnames";
import { Path } from "../../types/pathName";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { actions } from "../../app/authSlice";

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('header__nav-link', { 'header__is-active': isActive });

export const Header = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = Cookies.get('refresh_token');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

useEffect(() => {
  if (!token?.length) {
    localStorage.setItem("isLoggedIn", "false");
    dispatch(actions.logout())
    navigate('/');
  }
},[token?.length])

  return (
    <div className="header">

      <Link to="/" className="header__logo">
        <img className="header__logo-img" src="../../assets/Logo.png" alt="logo" />
      </Link>

      <nav className="header__nav-container">
        <div className="header__left">
          <div className="header__nav-item">
            <NavLink to="/" className={getLinkClass}>
              Головна
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to={Path.Gallery} className={getLinkClass}>
              Галерея
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
              Кошик
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to={Path.Favourites} className={getLinkClass}>
              Обране
            </NavLink>
          </div>

          {!isLoggedIn && (
              <div className="header__nav-item">
                <NavLink to={Path.Login} className={getLinkClass}>
                  Вхід
                </NavLink>
              </div>
          )}

          {isLoggedIn && (
            <div className="header__nav-item">
              <NavLink to={Path.Account} className={getLinkClass}>
                Мій аакаунт
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
