"use client";

import { signIn, useSession } from "next-auth/react";
import styles from "./logIn.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GiFishing } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import ThemeToggle from "@/components/themeToggle/themeToggle";
import ClipLoader from "react-spinners/ClipLoader";
import Login from "@/components/authentication/login/login";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className={styles.container}><ClipLoader color={"#00a6ff"}/></div>;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link className={styles.logoContainer} href="/">
          <GiFishing className={styles.icon}/>
          <div className={styles.text}>
            <span>Job</span>
            <span>Trackr</span> 
          </div>
        </Link>
        <ThemeToggle/>
      </div>
      <div className={styles.wrapper}>
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
          <span>Don't have an account?</span>
          <span>Sign up</span>
        </Link>
        <Login/>
      </div>
    </div>
  );
};

export default LoginPage;