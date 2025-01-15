import React from 'react'
import styles from "./form.module.css"
import Link from 'next/link'

const AuthenticationForm = () => {
  return (
    <div>
      <Link href="/login" className={styles.login}>
        Log in
      </Link>
      <Link href="/signup" className={styles.signup}>
        Sign up
      </Link>
    </div>
  )
}

export default AuthenticationForm