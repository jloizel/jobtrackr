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
      backgroundColor: "",
      borderColor: ""
    }
  ]);
  const { theme } = useContext(ThemeContext);
  const [hoveredButtonId, setHoveredButtonId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/features.json');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  const handleOnClick = () => {
    window.location.href = "/signup";
  }

  return (
    <div className={styles.wrapper}>
      {data.map((feature) => {
        const selectedImage = theme === 'dark' ? feature.darkImage : feature.lightImage;

        return (
          <div
            key={feature.id}
            className={styles.featureContainer}
          >
            <div className={styles.imageBackground} style={{border: `solid 2px ${feature.borderColor}`}}>
              <div className={styles.imageContainer}>
                <img src={selectedImage} alt={feature.header} />
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.header}>{feature.header}</div>
              <div className={styles.subHeader}>{feature.subHeader}</div>
              <button 
                className={styles.button}
                style={{
                  border: `solid 2px ${feature.borderColor}`,
                  backgroundColor: hoveredButtonId === feature.id ? feature.borderColor : "",
                  color: hoveredButtonId === feature.id ? "#fff" : feature.borderColor,
                }}
                onClick={handleOnClick}
                onMouseEnter={() => setHoveredButtonId(feature.id)}
                onMouseLeave={() => setHoveredButtonId(null)}
              >{feature.buttonText}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Features;