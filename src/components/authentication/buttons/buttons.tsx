"use client"

import { AuthContext } from "@/providers/AuthProvider";
import styles from "./buttons.module.css"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";

const AuthenticationButtons = () => {
  const { status } = useSession();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  
  const handleSignOut = async () => {
    await signOut(); 
    setIsLoggedIn(false);
  };

  return (
    <div className={styles.authentication}>
      <div className={styles.buttonContainer}>
        {!isLoggedIn ? (
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

