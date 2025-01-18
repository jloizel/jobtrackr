"use client";

import { GiFishing } from "react-icons/gi";
import Authentication from "../authentication/buttons/buttons";
import ThemeToggle from "../themeToggle/themeToggle";
import styles from "./navbar.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import Drawer from "@mui/material/Drawer";
import { AuthContext } from "@/providers/AuthProvider";

const MobileNavbar = () => {
  const { data: session } = useSession();
  const { isLoggedIn } = useContext(AuthContext); 
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }
    return () => {
      document.body.classList.remove("noScroll");
    };
  }, [menuOpen]);  

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={styles.navbar}>
      <Link className={styles.title} href={"/"}>
        <GiFishing className={styles.icon} />
        <div className={styles.text}>
          <span>Job</span>
          <span>Trackr</span>
        </div>
      </Link>

      <div className={styles.mobileRightContainer}>
        <ThemeToggle />
        <Hamburger toggled={menuOpen} toggle={handleMenuClick} size={24} direction="left" />
      </div>

      <Drawer
        open={menuOpen}
        anchor="right"
        onClose={closeMenu}
        disableScrollLock={true}
        hideBackdrop={true}
        sx={{
          "& .MuiDrawer-paper": {
            height: "90vh", 
            width: "100vw",
            top: "10vh",
            boxShadow: "none",
            border: "none",
            background: "none"
          },
        }}
        ModalProps={{
          BackdropProps: {
            style: {
              backgroundColor: "transparent", 
            },
          },
        }}
      >
        <div className={styles.drawerContent}>
          <div className={styles.linkContainer}>
            {(session || isLoggedIn) && links.map((link) => (
              <div key={link.name} onClick={closeMenu}>
                <Link href={link.path} className={styles.link}>
                  {link.name}
                </Link>
              </div>
            ))} 
          </div>
          <div className={styles.rightContainer}>
            <Authentication />
          </div>
        </div>
      </Drawer>

    </div>
  );
};

export default MobileNavbar;
