"use client"

import styles from "./buttons.module.css"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const AuthenticationButtons = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  
  const handleSignOut = async () => {
    await signOut(); 
    localStorage.removeItem('userEmail');
  };

  return (
    <div className={styles.authentication}>
      <div className={styles.buttonContainer}>
        {!session ? (
          <>
            <Link href="/login" className={styles.login}>
              Log in
            </Link>
            <Link href="/signup" className={styles.signup}>
              Sign up
            </Link>
          </>
        ):(
          <div className={styles.signup} onClick={handleSignOut}>
            Sign out
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthenticationButtons

