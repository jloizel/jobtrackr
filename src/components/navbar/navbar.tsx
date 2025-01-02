"use client"

import { GiFishing } from "react-icons/gi";
import Authentication from "../authentication/authentication";
import ThemeToggle from "../themeToggle/themeToggle";
import styles from "./navbar.module.css"
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  
  const { data: session } = useSession();

  const links = [
    { name: session ? 'My Tracker' : 'Tracker', path: session ? '/mytracker' : '/product/tracker' },
    { name: session ? 'My CV' : 'CV Upload', path: session ? '/mycv' : '/product/cv-upload' },
    { name: session ? 'My Cover Letter' : 'Cover Letter Upload', path: session ? '/mycoverletter' : '/product/cover-letter-upload' },
  ];

  return (
    <div className={styles.navbar}>
      <Link className={styles.title} href={"/"}>
        <GiFishing className={styles.icon}/>
        <div className={styles.text}>
          <span>Job</span>
          <span>Trackr</span> 
        </div>
      </Link>
      <div className={styles.linkContainer}>
        {links.map((link) => (
          <div key={link.name}>
            <Link href={link.path} className={styles.link}>
              {link.name}
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.rightContainer}>
        <Authentication/>
        <ThemeToggle/>
      </div>
    </div>
 );
}

export default Navbar

