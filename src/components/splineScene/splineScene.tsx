import React, { useRef, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import styles from "./splineScene.module.css"

const SplineScene = () => {
  const [sceneKey, setSceneKey] = useState(0); 
  const splineRef = useRef(null);

  function onLoad(splineApp:any) {
    splineRef.current = splineApp;

    const camera = splineApp.currentCamera;
    if (camera) {
      camera.position.set(0, 0, 800); 
    }
  }

  function resetScene() {
    setSceneKey((prevKey) => prevKey + 1); // changing the key forces a re-render
  }

  // restart scene after a delay 
  useEffect(() => {
    const interval = setInterval(() => {
      resetScene(); 
    }, 12000); // match full animation cycle

    return () => clearInterval(interval); 
  }, []);

  return (
    <Spline
      key={sceneKey} 
      scene="https://prod.spline.design/ZDnufltbCL2CG535/scene.splinecode"
      onLoad={onLoad}
      className={styles.container}
    />
  );
};

export default SplineScene;
