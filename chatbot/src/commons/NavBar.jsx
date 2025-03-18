import React from "react";
import styles from "./NavBar.module.css";
import logo from "../assets/Cat.svg";

const NavBar = ({ theme, toggleTheme }) => {
  return (
    <nav className={`${styles.navbar} ${theme}`}>
      <img className={styles.logo} src={logo} alt="Logo" />
      <button onClick={toggleTheme} className={styles["theme-toggle-button"]}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </nav>
  );
};

export default NavBar;
