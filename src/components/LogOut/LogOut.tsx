import React from "react";
import Cookies from "js-cookie";
import './LogOut.scss';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { actions } from "../../app/Slices/authSlice";

export default function LogOut() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logOut = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    dispatch(actions.logout());
    navigate('/');
  }

  return (
    <button onClick={logOut} className="logout">
      Вийти з акаунту
    </button>
  );
}
