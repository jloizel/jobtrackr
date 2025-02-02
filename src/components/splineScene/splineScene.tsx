import React, { useRef, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import styles from "./splineScene.module.css";
import { createTheme, useMediaQuery } from "@mui/material";

const SplineScene = () => {
  const splineRef = useRef<any>(null);
  const [zoom, setZoom] = useState(1); // Default zoom level

  function onLoad(splineApp: any) {
    splineRef.current = splineApp;
    updateZoom(); // Set initial zoom based on screen size
  }

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  function updateZoom() {
    if (splineRef.current) {
      const screenWidth = window.innerWidth;

      let newZoom = 0.7;
      if (isMobile) {
        newZoom = 0.8;
      } else if (isTablet) {
        newZoom = 0.9;
      } else {
        newZoom = 2; 
      }

      setZoom(newZoom);
      splineRef.current.setZoom(newZoom);
    }
  }

  return (
    <Spline
      scene="https://prod.spline.design/ZDnufltbCL2CG535/scene.splinecode"
      onLoad={onLoad}
      className={styles.container}
    />
  );
};

export default SplineScene;
