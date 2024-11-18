import styles from "./themeToggle.module.css"
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { useContext } from "react";
import { ThemeContext } from "../../app/theme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={styles.themeToggle}>
      {/* <div>
        <IoMoon/>
      </div>
      <div>
        <MdSunny/>
      </div> */}
              <button onClick={() => toggleTheme()}>{theme}</button>

    </div>
 );
}

export default ThemeToggle

