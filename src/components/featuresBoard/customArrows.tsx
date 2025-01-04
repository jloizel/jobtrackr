import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./featuresBoard.module.css";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  swiper: any; // Pass the swiper instance
}

export const NextArrow: React.FC<ArrowProps> = ({ swiper, style, className }) => {
  return (
    <div
      className={`${styles.customNextArrow} ${className}`}
      style={{ ...style, display: "block" }}
      onClick={() => swiper?.slideNext()}
    >
      <IoIosArrowForward />
    </div>
  );
};

export const PrevArrow: React.FC<ArrowProps> = ({ swiper, style, className }) => {
  return (
    <div
      className={`${styles.customPrevArrow} ${className}`}
      style={{ ...style, display: "block" }}
      onClick={() => swiper?.slidePrev()}
    >
      <IoIosArrowBack />
    </div>
  );
};
