'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./theme";

export default function Home() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={styles.page}>
      <Navbar/>
    </div>
  );
}
