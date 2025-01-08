"use client"

import React, { useEffect, useState } from 'react'
import styles from "./features.module.css"


const Features = () => {
  const [data, setData] = useState([
    {
      id: "",
      header: "",
      subHeader: "",
      buttonText: "",
      imageUrl: "",
      backgroundUrl: ""
    }
  ]);

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
      {data.map((feature) => (
        <div key={feature.id} className={styles.featureContainer}>
          <div className={styles.imageContainer}>
            <img src={feature.imageUrl}/>
          </div>
          <div className={styles.content}>
            <span>{feature.header}</span>
            <span>{feature.subHeader}</span>
            <span>{feature.buttonText}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features