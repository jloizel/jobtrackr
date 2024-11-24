"use client";

import styles from "./featuresBoard.module.css";

const FeaturesBoard = () => {
  
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          Job Tracker
        </div>
        <div className={styles.button}>
          CV Upload
        </div>
        <div className={styles.button}>
          Cover Letter Upload
        </div>
      </div>
    </div>
  );
};

export default FeaturesBoard;