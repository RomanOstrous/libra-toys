import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import './styles/index.scss';
import { Header } from "./components/Header/Header";
import Cookies from "js-cookie";
import { tokenRefresh } from "./helpers/RefreshToken";
import { useAppDispatch, useAppSelector } from "./app/hook";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./helpers/scrool";
import { initProduct } from "./app/Slices/productSlice";

export const App = () => {
  const refreshToken = Cookies.get('refresh_token');
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initProduct())
      .then(() => setIsDataLoaded(true))
      .catch(() => setIsDataLoaded(true)); 
  }, [dispatch, isDataLoaded]);

  useEffect(() => {
    if (refreshToken) {
      const intervalId = setInterval(() => {
        tokenRefresh(refreshToken);
      }, 60 * 4000);
      
      return () => {
        clearInterval(intervalId);
      };
    } else {
      console.log('Користувач не загружений');
    }
  }, [isLoggedIn, refreshToken]);

  return (
    <>
      <header className="head">
        <Header />
      </header>
      <main className="main">
        <ScrollToTop />
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
