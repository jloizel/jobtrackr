"use client";

import { signIn, useSession } from "next-auth/react";
import styles from "./signUp.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GiFishing } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import ThemeToggle from "@/components/themeToggle/themeToggle";
import AuthenticationForm from "@/components/authentication/signupForm/signupForm";
import { IoMailOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { MdKeyboardArrowLeft } from "react-icons/md";


const SignupPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className={styles.container}><ClipLoader color={"#00a6ff"}/></div>;
  }

  const handleClick = () => {
    setShowForm((prev) => !prev)
  }
  
  return (
    <div className={styles.page}>
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
        <div className={styles.header}>Sign Up</div>
        <div className={styles.subHeader}>Track and organise your job search for free.</div>
        {!showForm ? (
          <div className={styles.buttonsContainer}>
            <div className={`${styles.socialButton} ${styles.googleButton}`} onClick={() => signIn("google")}>
              <img src="/icons8-google.svg" className={styles.socialIcon}/>
              <span>Continue with Google</span>
            </div>
            <div className={`${styles.socialButton} ${styles.githubButton}`} onClick={() => signIn("github")}>
              <FaGithub className={styles.githubIcon}/>
              <span>Continue with Github</span>
            </div>
            <div className={styles.separatorContainer}>
              <div/>
              <span>or</span>
              <div/>
            </div>
            <div className={`${styles.socialButton} ${styles.githubButton}`} onClick={handleClick}>
              <IoMailOutline className={styles.githubIcon}/>
              <span>Continue with Email</span>
            </div>
          </div>
        ) : (
          <div className={styles.formContainer}>
            <span className={styles.back} onClick={handleClick}>
              <MdKeyboardArrowLeft className={styles.arrow}/> 
              Back
            </span>
            <AuthenticationForm/>
          </div>
        )}
        <Link className={styles.textContainer} href="/login">
          <span>Already have an account?</span>
          <span>Log in</span>
        </Link>
      </div>
      
    </div>
  );
};

export default SignupPage;