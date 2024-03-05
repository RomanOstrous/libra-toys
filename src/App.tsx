import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import './App.scss';
import { useEffect } from "react";
import Cookies from "js-cookie";
import { tokenRefresh } from "./helpers/RefreshToken";
import { useAppSelector } from "./app/hook";

export const App = () => {
  const refreshToken = Cookies.get('refresh_token');
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  
useEffect(() => {

  if (refreshToken) {
    const intervalId = setInterval(() => {
      tokenRefresh(refreshToken);
    }, 4 * 60 * 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  } else {
    console.log('Користувач не загружений');
  }
}, [isLoggedIn]);

  return (
    <>
      <header className="head">
        <Header />
      </header>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};