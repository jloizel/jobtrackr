import React from "react";
import Spline from "@splinetool/react-spline";
import styles from "./splineScene.module.css"; 

const SplineScene = () => {
  
  return (
    <Spline
      scene="https://prod.spline.design/ZDnufltbCL2CG535/scene.splinecode"
      className={styles.container}
    />
  );
};

export default SplineScene;
