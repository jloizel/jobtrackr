"use client";

import { signIn, useSession } from "next-auth/react";
import styles from "./signUp.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GiFishing } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import ThemeToggle from "@/components/themeToggle/themeToggle";

const SignupPage = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }
  
  return (
    <div className={styles.page}>
      <div className={styles.logoContainer}>
        <GiFishing className={styles.icon}/>
        <div className={styles.text}>
          <span>Job</span>
          <span>Trackr</span> 
        </div>
      </div>
      <div className={styles.toggleContainer}>
        <ThemeToggle/>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.header}>Sign Up</div>
        <div className={styles.subHeader}>Track and organise your job search for free.</div>
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
        <Link className={styles.textContainer} href="/login">
          <span>Already have an account?</span>
          <span>Log in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;