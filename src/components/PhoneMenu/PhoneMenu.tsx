import React from "react";
import classNames from "classnames";
import './PhoneMenu.scss';
import { Path } from "../../types/pathName";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import { useEffect } from "react";

type Props = {
  burger: boolean;
};

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('phone-menu__nav-link', { 'phone-menu__is-active': isActive }
);

export default function PhoneMenu({burger}: Props) {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (burger) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [burger]);

  return (
    <div className={classNames('phone-menu', {
      'phone-menu__active': burger,
      'phone-menu__inactive': !burger
    })}>
      <div className="phone-menu__link">
        <NavLink to={Path.Toys} className={getLinkClass}>
          Іграшки
        </NavLink>

        <NavLink to={Path.About} className={getLinkClass}>
          Про нас
        </NavLink>

        <NavLink to={Path.Favourites} className={getLinkClass}>
          Вподобайки
        </NavLink>

        {isLoggedIn ? (
          <NavLink to={Path.Account} className={getLinkClass}>
            Акаунт
          </NavLink>
        ):(
          <NavLink to={Path.Login} className={getLinkClass}>
            Акаунт
          </NavLink>
        )}
      </div>

      {!isLoggedIn && (
        <>
          <div className="phone-menu__buttons">
            <button className="" onClick={() => navigate(Path.Login)}>
              Вхід
            </button>

            <button className="" onClick={() => navigate(Path.Login)}>
              Зареєструватись
            </button>
          </div>
        </>
      )}
    </div>
  );
}
