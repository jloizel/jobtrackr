"use client"

import React, { useEffect, useState } from 'react'
import styles from "./testimonials.module.css"
import { BiSolidQuoteLeft } from "react-icons/bi";
import { BiSolidQuoteRight } from "react-icons/bi";

const Testimonials = () => {
  const [data, setData] = useState([
    {
      id: "",
      name: "",
      job: "",
      company: "",
      review: ""
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

  return (
    <div className={styles.container}>
      {data.length > 0 && (
        <div className={styles.testimonialCard}>
          <BiSolidQuoteLeft />
          <div className={styles.testimonialContent}>
            <div>{data[index].review}</div>
            <div>{data[index].job} - {data[index].name}</div>
            <div>{data[index].company}</div>
          </div>
          <BiSolidQuoteRight />
        </div>
      )}

      {/* <button onClick={handlePrevious} className={styles.prevButton}>
        Prev
      </button>
      <button onClick={handleNext} className={styles.nextButton}>
        Next
      </button> */}
    </div>
  );
};

export default Testimonials