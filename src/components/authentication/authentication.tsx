import styles from "./authentication.module.css"

const Authentication = () => {

  return (
    <div className={styles.authentication}>
      <div className={styles.login}>
        Log in
      </div>
      <div className={styles.signup}>
        Sign up
      </div>
    </div>
 );
}

export default Authentication

