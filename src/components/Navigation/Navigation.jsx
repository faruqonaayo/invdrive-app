import { Link, Navigate, NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./Navigation.module.css";

export default function Navigation({ isAuth, onSetAuth }) {
  const [navOpen, setNavOpen] = useState(false);

  // this function is in charge of showing and hiding the navigation menu
  function toggleNav() {
    setNavOpen(!navOpen);
  }

  // this function is in charge of logging out the user
  function handleLogInOut() {
    setNavOpen(false);
    if (isAuth) {
      localStorage.removeItem("InvDrive");
      onSetAuth(false);
    }
  }

  return (
    <nav className={styles.appNav}>
      <div className={styles.appLogo}>
        <label>
          Inv<span>Drive</span>
        </label>
      </div>
      <ul className={`${styles.navOptions} ${navOpen ? styles.open : ""}`}>
        <li onClick={() => setNavOpen(false)}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li onClick={() => setNavOpen(false)}>
          <NavLink to="/manage">Manage</NavLink>
        </li>

        <li onClick={handleLogInOut}>
          <NavLink to="/auth">Sign In </NavLink>
        </li>
      </ul>
      <div className={styles.burgerBtn} onClick={toggleNav}>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
