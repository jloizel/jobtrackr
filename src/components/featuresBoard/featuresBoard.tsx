import styles from "./featuresBoard.module.css";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { CgFileDocument } from "react-icons/cg";
import { FaRegEnvelope } from "react-icons/fa";
import { PiBriefcaseBold } from "react-icons/pi";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/utils/theme";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from 'swiper/modules';
import { NextArrow, PrevArrow } from "./customArrows";


const FeaturesBoard = () => {
  const [data, setData] = useState([
    {
      id: "",
      name: "",
      color: "",
      border: "",
      icon: "",
      backgroundColor: "",
      description: [
        {
          title: "",
          content: "",
          imageDarkMode: "",
          imageLightMode: "",
        }
      ]
    },
  ]);
  const [activeItem, setActiveItem] = useState<string | null>("Job Tracker");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { theme } = useContext(ThemeContext);
  const [selectedDescriptionIndex, setSelectedDescriptionIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isAtStart, setIsAtStart] = useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);


  const getData = () => {
    fetch('/features.json', {
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      setData(myJson);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFeatureClick = (feature: string) => {
    setActiveItem(feature === activeItem ? null : feature);
    setSelectedDescriptionIndex(0);
  };

  const handleFeatureHover = (feature: string) => {
    setHoveredItem(feature);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "PiBriefcaseBold":
        return <PiBriefcaseBold />;
      case "CgFileDocument":
        return <CgFileDocument />;
      case "FaRegEnvelope":
        return <FaRegEnvelope />;
      default:
        return null;
    }
  };

  const selectedFeature = data.find((feature) => feature.name === activeItem);
  const bgColor = selectedFeature?.backgroundColor;
  const selectedDescriptionItem = selectedFeature?.description[selectedDescriptionIndex];
  const selectedImage = theme === "dark" ? selectedDescriptionItem?.imageDarkMode : selectedDescriptionItem?.imageLightMode;

  const handleDescriptionClick = (index: number) => {
    setSelectedDescriptionIndex(index);
    swiperInstance?.slideTo(index);
  };

  const handleSlideChange = () => {
    if (!swiperInstance) return;
    setIsAtStart(swiperInstance.isBeginning);
    setIsAtEnd(swiperInstance.isEnd);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        {data.map((feature) => {
          const isHovered = hoveredItem === feature.name;
          const isActive = activeItem === feature.name;
          const buttonStyles = {
            backgroundColor: isHovered || isActive ? feature.color : "",
            border: 
              `2px solid ${
                isHovered || isActive ? feature.border : "transparent"
              }`,
            fontWeight: isHovered || isActive ? 600 : "", 
          };
          const buttonTextStyles = {
            color: isHovered || isActive ? "#06283D" : ""
          };
          const iconStyles = {
            color: isHovered || isActive ? feature.border : "",
          };

          return (
            <div
              key={feature.id}
              className={styles.button}
              style={buttonStyles}
              onClick={() => handleFeatureClick(feature.name)}
              onMouseEnter={() => handleFeatureHover(feature.name)}
              onMouseLeave={handleMouseLeave}
            >
              <span 
                style={iconStyles}
                className={styles.icon}
              >
                {renderIcon(feature.icon)}
              </span>
              <span className={styles.buttonText} style={buttonTextStyles}>{feature.name}</span>
            </div>
          );
        })}
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.imageContainer} style={{ backgroundColor: bgColor }}>
          {selectedDescriptionItem && (
            <img 
              src={selectedImage}
              alt={`${selectedDescriptionItem.title} image`}
              className={styles.descriptionImage}
            />
          )}
        </div>

        <div className={styles.swiperContainer}>
          <PrevArrow swiper={swiperInstance} className={`${styles.customPrevArrow} ${isAtStart ? styles.disabledArrow : ""}`}
          />
          <NextArrow swiper={swiperInstance} className={`${styles.customNextArrow} ${isAtEnd ? styles.disabledArrow : ""}`}
          />
          <Swiper
            spaceBetween={120}
            slidesPerView={1.5} 
            modules={[ Navigation]}
            // pagination={{ clickable: true }}
            slidesOffsetAfter={120}
            onSlideChange={handleSlideChange}
            onSwiper={setSwiperInstance}
            breakpoints={{
              400: {
                spaceBetween: 100,
                slidesOffsetAfter: 100
              },
              600: {
                spaceBetween: 80,
                slidesOffsetAfter: 80
              },
              900: {
                slidesPerView: 2.5, 
                spaceBetween: 50,
                slidesOffsetAfter: 50
              }
            }}
            className={styles.descriptionContainer}
          >
            {selectedFeature?.description.map((descriptionItem, index) => (
              <SwiperSlide key={index}>
                <div
                  key={index}
                  className={`${styles.descriptionBox} ${index === selectedDescriptionIndex ? styles.activeDescription : ""}`}
                  onClick={() => handleDescriptionClick(index)}
                >
                  <span className={styles.descriptionTitle}>
                    {descriptionItem.title}
                  </span>
                  <span className={styles.descriptionContent}>
                    {descriptionItem.content}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FeaturesBoard;
