import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import './App.scss';

export const App = () => {
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