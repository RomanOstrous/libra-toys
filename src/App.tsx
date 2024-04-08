import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import './styles/index.scss';
import { Header } from "./components/Header/Header";
import Cookies from "js-cookie";
import { tokenRefresh } from "./helpers/RefreshToken";
import { useAppDispatch, useAppSelector } from "./app/hook";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./helpers/scrool";
import { initProduct } from "./app/Slices/productSlice";
import { initCategory } from "./app/Slices/categorySlice";
import { updateWishlist } from "./app/Slices/wishListSlice";

export const App = () => {
  const refreshToken = Cookies.get('refresh_token');
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initProduct());
    dispatch(initCategory());

    if(isLoggedIn) {
      dispatch(updateWishlist());
    }
  }, [dispatch, isLoggedIn]);

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
