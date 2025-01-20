import React from 'react'
import styles from "./steps.module.css"
import AuthenticationForm from '../authentication/signupForm/signupForm'
import Link from 'next/link'

const Steps = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <span className={styles.header1}>How to Get Started</span>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span>1. Sign Up</span>
              <span>Create a JobTrackr account for free.</span>
            </div>
            <div className={styles.step}>
              <span>2. Start Tracking</span>
              <span>Begin organizing your job applications effortlessly.</span>
            </div>
            <div className={styles.step}>
              <span>3. Upload your Files</span>
              <span>Easily store and manage your documents.</span>
            </div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.content}>
            <div className={styles.header2}>
              Register for free & start organising your job search
            </div>
            <div className={styles.formContainer}>
              <AuthenticationForm/>
            </div>
            <Link className={styles.textContainer} href="/login">
              <span>Already have an account?</span>
              <span>Log in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Steps