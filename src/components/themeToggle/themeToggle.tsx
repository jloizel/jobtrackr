import styles from "./themeToggle.module.css"
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";

const ThemeToggle = () => {

  return (
    <div className={styles.themeToggle}>
      <div>
        <IoIosSunny/>
      </div>
      <div>
        <FaMoon/>
      </div>
    </div>
 );
}

export default ThemeToggle

