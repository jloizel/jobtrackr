'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../utils/theme";
import { useSession } from "next-auth/react";
import FeaturesBoard from "@/components/featuresBoard/featuresBoard";
import Link from "next/link";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const { status } = useSession();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={styles.page}>
      <div className={styles.headerContent}>
        <div className={styles.leftContainer}>
          <div className={styles.headerText}>
            <span className={styles.headerText1}>
              Organised, Easy
            </span>
            <div className={styles.headerText2}>
              <span>Job</span>
              <span>Tracking</span>
            </div>
            <span className={styles.headerText3}>
              jobTrackr takes the stress out of job applications with a seamless organisation of your job search, so you never miss an opportunity.
            </span>
          </div>
          {status === "unauthenticated" && (
            <Link href="/signup" className={styles.signup}>
              Sign up for free
            </Link>
          )}
        </div>
        <div className={styles.rightContainer}>

        </div>
      </div>
      <FeaturesBoard/>
    </div>
  );
}
