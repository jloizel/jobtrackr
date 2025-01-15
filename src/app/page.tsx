'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../utils/theme";
import { useSession } from "next-auth/react";
import FeaturesBoard from "@/components/featuresBoard/featuresBoard";
import Link from "next/link";
import Testimonials from "@/components/testimonials/testimonials";
import Features from "@/components/features/features";
import TestimonialsSlider from "@/components/testimonials/testimonialsSlider";

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
              Easy, Organised
            </span>
            <div className={styles.headerText2}>
              <span>Job</span>
              <span>Tracking</span>
            </div>
            <span className={styles.headerText3}>
              JobTrackr takes the stress out of job applications with a seamless organisation of your job search, so you never miss an opportunity.
            </span>
          </div>
          {status === "unauthenticated" && (
            <Link href="/signup" className={styles.signup}>
              Sign up for free
            </Link>
          )}
        </div>
        {/* <div className={styles.rightContainer}>

        </div> */}
      </div>
      <FeaturesBoard/>
      <div className={styles.title}>
        JobTrackr’s intuitive tools will help you <span>stay on top</span> of your job applications. Easily <span>manage and track</span> every detail of your job search, so you can focus on <span>what matters most</span>.
      </div>
      <Features/>
      {/* <Testimonials/> */}
      <section className={styles.testimonials}>
        <div className={styles.testimonialsContent}>
          <div className={styles.header} >
            {/* <span style={{color: "#008489"}}>Talented people </span> */}
            <span>Loved by Our Loyal Users</span>
          </div>
        </div>
        {/* <Testimonials/> */}
        <TestimonialsSlider/>
      </section>
    </div>
  );
}
