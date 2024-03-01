import { Link, NavLink } from "react-router-dom";
import './Header.scss'
import classNames from "classnames";
import { Path } from "../../types/pathName";

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('header__nav-link', { 'header__is-active': isActive });

export const Header = () => {
  return (
    <div className="header">
      <div className="header__link-container">
        <div className="header__logo">
          <Link to="/">
            <h1>LIBRA-LOGO</h1>
          </Link>
        </div>

        <nav className="header__nav-container">
          <div className="header__nav-item">
            <NavLink to="/" className={getLinkClass}>
              HOME
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to={Path.Gallery} className={getLinkClass}>
              Gallery
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to={Path.About} className={getLinkClass}>
              About
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to={Path.Cart} className={getLinkClass}>
              Cart
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to={Path.Favourites} className={getLinkClass}>
              Favourites
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to={Path.Account} className={getLinkClass}>
              Account
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to={Path.Login} className={getLinkClass}>
              Login
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
};