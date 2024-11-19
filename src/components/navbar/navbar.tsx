import { GiFishing } from "react-icons/gi";
import Authentication from "../authentication/authentication";
import ThemeToggle from "../themeToggle/themeToggle";
import styles from "./navbar.module.css"
import { createTheme, useMediaQuery } from '@mui/material';

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
const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
const isTabletOrBelow = useMediaQuery(theme.breakpoints.down('md'));
const isComputer = useMediaQuery(theme.breakpoints.up('md'));

const Navbar = () => {
  

  return (
    <div className={styles.navbar}>

      <ThemeToggle/>
      <a className={styles.title} href={"/"}>
        <GiFishing className={styles.icon}/>
        <div className={styles.text}>
          <span>Job</span>
          <span>Trackr</span> 
        </div>
      </a>
      <Authentication/>
    </div>
 );
}

export default Navbar

