import Authentication from "../authentication/authentication";
import styles from "./navbar.module.css"

const Navbar = () => {

  return (
    <div className={styles.navbar}>
      <div className={styles.title}>
        <span>Job</span>
        <span>Trackr</span>
      </div>
      <Authentication/>
    </div>
 );
}

export default Navbar

