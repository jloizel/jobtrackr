"use client"

import styles from "./buttons.module.css"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthenticationButtons = () => {
  const { status } = useSession();

  return (
    <div className={styles.authentication}>
      <div className={styles.buttonContainer}>
        {status === "unauthenticated" ? (
          <>
            <Link href="/login" className={styles.login}>
              Log in
            </Link>
            <Link href="/signup" className={styles.signup}>
              Sign up
            </Link>
          </>
        ):(
          <div className={styles.signup} onClick={() => signOut()}>
            Sign out
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthenticationButtons

