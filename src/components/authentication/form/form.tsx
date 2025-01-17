import React from 'react'
import styles from "./form.module.css"
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import Register from './register'

const AuthenticationForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>Start organising your job tracking for free</div>
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
        {/* <Link className={styles.textContainer} href="/signup">
          <span>Already have an account?</span>
          <span>Log in</span>
        </Link> */}
        {/* <Register/> */}
      </div>
    </div>
  )
}

export default AuthenticationForm