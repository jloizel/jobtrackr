'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../utils/theme";
import { useSession } from "next-auth/react";
import FeaturesBoard from "@/components/featuresBoard/featuresBoard";
import Link from "next/link";
import Features from "@/components/features/features";
import TestimonialsSlider from "@/components/testimonials/testimonialsSlider";
import Steps from "@/components/steps/steps";
import Slide from "@/components/scrollAnimations/slide";

export default function Home() {
  const { theme } = useContext(ThemeContext);

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
          {/* {status === "unauthenticated" && ( */}
            <Link href="/signup" className={styles.signup}>
              Sign up for free
            </Link>
          {/* )} */}
        </div>
      </div>
      <FeaturesBoard/>
      <Slide className={styles.title}>
      {/* <div className={styles.title}> */}
        JobTrackr’s intuitive tools will help you <span>stay on top</span> of your job applications. Easily <span>manage and track</span> every detail of your job search, so you can focus on <span>what matters most</span>.
      {/* </div> */}
      </Slide>
      <Features/>
      {/* <Testimonials/> */}
      <div className={styles.testimonials}>
        <div className={styles.text1}>Celebrating User Success</div>
        <TestimonialsSlider/>
      </div>
      <div className={styles.prompt}>
        <span className={styles.text1}>
          Streamline Your Job Search
        </span>
        <span className={styles.text2}>
          Ditch the messy spreadsheets and take control of your job search with ease. Our intuitive one-click tools and drag-and-drop features make tracking applications seamless and stress-free. Focus less on organizing and more on landing your dream job!
        </span>
        <Link href="/signup" className={styles.signup}>
          Sign up for free
        </Link>
      </div>
      <Steps/>
    </div>
  );
}
