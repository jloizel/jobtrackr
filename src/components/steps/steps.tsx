import React from 'react'
import styles from "./steps.module.css"
import AuthenticationForm from '../authentication/form/form'

const Steps = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          How to Get Started
        </div>
        <div className={styles.rightContainer}>
          <AuthenticationForm/>
        </div>
      </div>
    </div>
  )
}

export default Steps