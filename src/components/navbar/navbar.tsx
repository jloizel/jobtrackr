"use client"

import { GiFishing } from "react-icons/gi";
import Authentication from "../authentication/authentication";
import ThemeToggle from "../themeToggle/themeToggle";
import styles from "./navbar.module.css"
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  
  const { status } = useSession();

  return (
    <div className={styles.navbar}>
      <div className={styles.toggleContainer}>
        <ThemeToggle/>
      </div>
      <Link className={styles.title} href={"/"}>
        <GiFishing className={styles.icon}/>
        <div className={styles.text}>
          <span>Job</span>
          <span>Trackr</span> 
        </div>
      </Link>
      <div className={styles.rightContainer}>
      {status === "authenticated" && (
        <Link href="/trackr">
          Trackr 
        </Link>
      )}
        <Authentication/>
      </div>
    </div>
 );
}

export default Navbar

