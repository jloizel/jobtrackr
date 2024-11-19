import styles from "./themeToggle.module.css"
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { useContext } from "react";
import { ThemeContext } from "../../app/theme";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={styles.themeToggle}>
      {theme === "dark"? (
        <IoMoonOutline
          onClick={() => toggleTheme()}
          className={styles.icon}
        />
      ):(
        <FiSun
          onClick={() => toggleTheme()}
          className={styles.icon}
        />
      )}
    </div>
 );
}

export default ThemeToggle

