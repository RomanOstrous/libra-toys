import React from "react";
import { createRoot } from 'react-dom/client';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import { Path } from './types/pathName';
import './styles/index.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import { Provider } from 'react-redux';
import store from './app/store';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { ToyPage } from './pages/Toy/ToyPage';
import { AboutPage } from './pages/About/AboutPage';
import { CartPage } from './pages/Cart/CartPage';
import { FavouritePage } from './pages/Favorites/FavouritePage';
import { NotFound } from './pages/NotFound/NotFound';
import { AccountPage } from './pages/Account/AccountPage';
import { LoginPage } from './pages/Login/LoginPage';
import { SigninPage } from './pages/Signin/SigninPage';
import { ToyDetalPage } from "./pages/ToyDetal/ToyDetalPage";
import BuyPage from "./pages/Buy/BuyPage";
import PasswordRecoveryPage from "./pages/PasswordReset/PasswordRecoveryPage";
import PasswordResetPage from "./pages/PasswordReset/PasswordResetPage";

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Provider store={store}>
    <Router>
      <Routes >
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path={Path.Toys}>
            <Route index element={<ToyPage/>} />
            <Route path=":slug?" element={<ToyDetalPage />} />
          </Route>

          <Route path={Path.About} element={<AboutPage />} />

          <Route path={Path.Cart} element={<CartPage />} />

          <Route path={Path.Buy} element={<BuyPage />} />

          <Route path={Path.Favourites} element={<FavouritePage />} />

          <Route path={Path.Signin} element={<SigninPage />} />

          <Route path={Path.Login} element={<LoginPage/>} />

          <Route path={Path.Account} element={<AccountPage />} />

          <Route path={Path.RecoveryPassword} element={<PasswordRecoveryPage />} />

          <Route path={Path.ResetPassword} element={<PasswordResetPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);