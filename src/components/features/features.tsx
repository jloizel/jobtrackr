"use client"

import React, { useContext, useEffect, useState } from 'react'
import styles from "./features.module.css"
import { ThemeContext } from '@/utils/theme';


const Features = () => {
  const [data, setData] = useState([
    {
      id: "",
      header: "",
      subHeader: "",
      buttonText: "",
      lightImage: "",
      darkImage: "",
      backgroundColor: ""
    }
  ]);
  const { theme } = useContext(ThemeContext);


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/features.json');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);


  return (
    <div className={styles.wrapper}>
      {data.map((feature) => {
        const selectedImage = theme === 'dark' ? feature.darkImage : feature.lightImage;

        return (
          <div
            key={feature.id}
            className={styles.featureContainer}
          >
            <div className={styles.imageBackground} style={{backgroundColor: feature.backgroundColor}}>
              <div className={styles.imageContainer}>
                <img src={selectedImage} alt={feature.header} />
              </div>
            </div>
            <div className={styles.content}>
              <h2 className={styles.header}>{feature.header}</h2>
              <p className={styles.subHeader}>{feature.subHeader}</p>
              <button className={styles.button}>{feature.buttonText}</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Features;