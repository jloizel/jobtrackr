"use client"

import { GiFishing } from "react-icons/gi";
import Authentication from "../authentication/buttons/buttons";
import ThemeToggle from "../themeToggle/themeToggle";
import styles from "./navbar.module.css"
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  
  const { data: session } = useSession();

  // const links = [
  //   { name: session ? "My Tracker" : "Tracker", path: session ? "/my-tracker" : "/tools/job-tracker" },
  //   { name: session ? "My CV" : "CV Upload", path: session ? "/my-cv" : "/tools/cv-upload" },
  //   { name: session ? "My Cover Letter" : "Cover Letter Upload", path: session ? "/my-cover-letter" : "/tools/cover-letter-upload" },
  // ];

  const links = [
    { name: "My Tracker", path: "/my-tracker" },
    { name: "My CV", path: "/my-cv" },
    { name: "My Cover Letter", path: "/my-cover-letter" },
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
        { session && links.map((link) => (
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

