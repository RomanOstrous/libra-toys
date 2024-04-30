import React from "react";
import Cookies from "js-cookie";
import './LogOut.scss';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { actions as log } from "../../app/Slices/authSlice";
import { actions } from "../../app/Slices/cartSlice";

export default function LogOut() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logOut = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    dispatch(log.logout());
    dispatch(actions.clear());
    navigate('/');
  }

  return (
    <button onClick={logOut} className="logout">
      Вийти з акаунту
    </button>
  );
}
