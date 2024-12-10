import styles from "./themeToggle.module.css"
import { useContext } from "react";
import { ThemeContext } from "../../utils/theme";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  console.log(theme)

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

