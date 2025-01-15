import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  swiper: any;
}

export const NextArrow: React.FC<ArrowProps> = ({ swiper, style, className }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "flex" }}
      onClick={() => swiper?.slideNext()}
    >
      <IoIosArrowForward />
    </div>
  );
};

export const PrevArrow: React.FC<ArrowProps> = ({ swiper, style, className }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "flex" }}
      onClick={() => swiper?.slidePrev()}
    >
      <IoIosArrowBack />
    </div>
  );
};
