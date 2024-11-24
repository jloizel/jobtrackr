import styles from "./featuresBoard.module.css";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { CgFileDocument } from "react-icons/cg";
import { FaRegEnvelope } from "react-icons/fa";
import { PiBriefcaseBold } from "react-icons/pi";


const FeaturesBoard = () => {
  
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <PiBriefcaseBold/>
          <span>Job Tracker</span>
        </div>
        <div className={styles.button}>
          <CgFileDocument/>
          <span>CV Upload</span>
        </div>
        <div className={styles.button}>
          <FaRegEnvelope/>
          <span>Cover Letter Upload</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturesBoard;