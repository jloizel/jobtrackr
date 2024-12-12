"use client"

import styles from "./authentication.module.css"
import { createTheme, Drawer, useMediaQuery } from '@mui/material';
import { useState } from "react";
import Hamburger from "hamburger-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Authentication = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { status } = useSession();

  const handleMenuClose = () => {
    setOpenMenu(false)
  }

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={styles.authentication}>
      {isMobile ? (
        <>
          <Hamburger toggled={openMenu} toggle={setOpenMenu} size={20} rounded hideOutline={true}/>
          <Drawer open={openMenu} onClose={handleMenuClose} anchor={"right"} PaperProps={{sx: { width: "100%",  marginTop: "100px" }}} BackdropProps={{ invisible: true }}>
            <div  className={styles.drawerContent}>
              <div className={styles.buttonContainer}>
                {status === "unauthenticated" ? (
                  <>
                    <Link href="/login" className={styles.login}>
                      Log in
                    </Link>
                    <Link href="/signup" className={styles.signup}>
                      Sign up for free
                    </Link>
                  </>
                ):(
                  <div className={styles.signup} onClick={() => signOut()}>
                    Sign out
                  </div>
                )}
              </div>
            </div>
          </Drawer>
        </>
        
      ):(
        <div className={styles.buttonContainer}>
          {status === "unauthenticated" ? (
            <>
              <Link href="/login" className={styles.login}>
                Log in
              </Link>
              <Link href="/signup" className={styles.signup}>
                Sign up for free
              </Link>
            </>
          ):(
            <div className={styles.signup} onClick={() => signOut()}>
              Sign out
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Authentication

