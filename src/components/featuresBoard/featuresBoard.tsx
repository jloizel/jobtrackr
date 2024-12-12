import styles from "./featuresBoard.module.css";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { CgFileDocument } from "react-icons/cg";
import { FaRegEnvelope } from "react-icons/fa";
import { PiBriefcaseBold } from "react-icons/pi";
import { useEffect, useState } from "react";

const FeaturesBoard = () => {
  const [data, setData] = useState([
    {
      id: "",
      name: "",
      color: "",
      border: "",
      icon: "",
      image: "",
      description: [
        {
          title: "",
          content: ""
        }
      ]
    },
  ]);
  const [activeItem, setActiveItem] = useState<string | null>("Job Tracker");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const getData=()=>{
    fetch('/features.json',{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson)
      });
    }

  useEffect(()=>{
    getData()
  },[])

  const handleFeatureClick = (feature: string) => {
    setActiveItem(feature === activeItem ? null : feature);
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
          }
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
    </div>
  );
};

export default FeaturesBoard;
