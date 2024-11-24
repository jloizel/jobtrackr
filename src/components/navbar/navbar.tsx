"use client"

import { GiFishing } from "react-icons/gi";
import Authentication from "../authentication/authentication";
import ThemeToggle from "../themeToggle/themeToggle";
import styles from "./navbar.module.css"

const Navbar = () => {
  
  return (
    <div className={styles.navbar}>
      <div className={styles.toggleContainer}>
        <ThemeToggle/>
      </div>
      <a className={styles.title} href={"/"}>
        <GiFishing className={styles.icon}/>
        <div className={styles.text}>
          <span>job</span>
          <span>Trackr</span> 
        </div>
      </a>
      <div className={styles.authenticationContainer}>
        <Authentication/>
      </div>
    </div>
 );
}

export default Navbar

