import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const [navOpen, setNavOpen] = useState(false);

  // this function is in charge of showing and hiding the navigation menu
  function toggleNav() {
    setNavOpen(!navOpen);
  }
  return (
    <nav className={styles.appNav}>
      <div className={styles.appLogo}>
        <label>Inv<span>Drive</span></label>
      </div>
      <ul className={`${styles.navOptions} ${navOpen ? styles.open : ""}`}>
        <li onClick={() => setNavOpen(false)}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li onClick={() => setNavOpen(false)}>
          <NavLink to="/manage">Manage</NavLink>
        </li>
        <li onClick={() => setNavOpen(false)}>
          <NavLink to="/auth">Login </NavLink>
        </li>
      </ul>
      <div className={styles.burgerBtn} onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
