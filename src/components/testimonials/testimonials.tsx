"use client"

import React, { useEffect, useState } from 'react'
import styles from "./testimonials.module.css"
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";


const Testimonials = () => {
  const [data, setData] = useState([
    {
      id: "",
      name: "",
      job: "",
      company: "",
      testimonial: ""
    }
  ]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/testimonials.json');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length); 
  };

  return (
    <div className={styles.container}>
      {data.length > 0 && (
        <div className={styles.testimonialContent}>
          <div className={styles.testimonial}>
            <BiSolidQuoteLeft className={styles.quoteIcon}/>
            <span>{data[index].testimonial}</span>
            <BiSolidQuoteRight className={styles.quoteIcon}/>
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.arrowContainer}>
              <FaArrowLeftLong onClick={handlePrevious} className={styles.arrowIcon}/>
            </div>
            <div className={styles.details}>
              <span>{data[index].name}</span>
              <span>{data[index].job} @ {data[index].company}</span>
            </div>
            <div className={styles.arrowContainer}>
              <FaArrowRightLong onClick={handleNext} className={styles.arrowIcon}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials