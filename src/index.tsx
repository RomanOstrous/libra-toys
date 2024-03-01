import { createRoot } from 'react-dom/client';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { Path } from './types/pathName';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { GalleryPage } from './pages/Gallery/GalleryPage';
import { AboutPage } from './pages/About/AboutPage';
import { CartPage } from './pages/Cart/CartPage';
import { FavouritePage } from './pages/Favorites/FavouritePage';
import { NotFound } from './pages/NotFound/NotFound';
import { AccountPage } from './pages/Account/AccountPage';
import { LoginPage } from './pages/Login/LoginPage';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path={Path.Home} element={<Navigate to="/" replace />} />

        <Route path={Path.Gallery}>
          <Route index element={<GalleryPage/>} />
        </Route>

        <Route path={Path.About} element={<AboutPage />} />

        <Route path={Path.Cart} element={<CartPage />} />

        <Route path={Path.Favourites} element={<FavouritePage />} />

        <Route path={Path.Login} element={<LoginPage/>} />

        <Route path={Path.Account} element={<AccountPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);