import Authentication from "../authentication/authentication";
import ThemeToggle from "../themeToggle/themeToggle";
import styles from "./navbar.module.css"
import { AiOutlineSchedule } from "react-icons/ai";
import { GiFishingLure } from "react-icons/gi";
import { GiFishing } from "react-icons/gi";

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

