import { Outlet } from "react-router-dom";
import './styles/index.scss';
import { Header } from "./components/Header/Header";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { tokenRefresh } from "./helpers/RefreshToken";
import { useAppSelector } from "./app/hook";
import Footer from "./components/Footer/Footer";

export const App = () => {
  const refreshToken = Cookies.get('refresh_token');
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

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
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};