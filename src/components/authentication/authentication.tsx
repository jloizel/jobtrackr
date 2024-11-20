import styles from "./authentication.module.css"
import { IoIosMenu } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { SlMenu } from "react-icons/sl";
import { RxHamburgerMenu } from "react-icons/rx";
import { createTheme, useMediaQuery } from '@mui/material';
import { useState } from "react";

const Authentication = () => {
  const [openModal, setOpenModal] = useState(false)

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
        <RxHamburgerMenu className={styles.menuIcon}/>
      ):(
        <div className={styles.buttonContainer}>
          <div className={styles.login}>
            Log in
          </div>
          <div className={styles.signup}>
            Sign up
          </div>
      </div>
      )}
    </div>
  );
}

export default Authentication

