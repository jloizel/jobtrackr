import React from 'react'
import styles from "./form.module.css"
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react'

const AuthenticationForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Log In</div>
        <div className={styles.buttonsContainer}>
          <div className={`${styles.socialButton} ${styles.googleButton}`} onClick={() => signIn("google")}>
            <img src="/icons8-google.svg" className={styles.socialIcon}/>
            <span>Continue with Google</span>
          </div>
          <div className={`${styles.socialButton} ${styles.githubButton}`} onClick={() => signIn("github")}>
            <FaGithub className={styles.githubIcon}/>
            <span>Continue with Github</span>
          </div>
        </div>
        <Link className={styles.textContainer} href="/signup">
          <span>Already have an account?</span>
          <span>Log in</span>
        </Link>
    </div>
  )
}

export default AuthenticationForm