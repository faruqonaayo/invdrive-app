import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Layout({ isAuth, onSetAuth }) {
  return (
    <>
      <header>
        <Navigation isAuth={isAuth} onSetAuth={onSetAuth} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
