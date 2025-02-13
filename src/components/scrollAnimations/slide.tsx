"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function Slide({ children, delay = 0, className }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Curtain Reveal */}
      <motion.div
        initial={{ translateX: "-100%" }} 
        animate={isInView ? { translateX: "101%" } : {}} 
        transition={{
          duration: 0.5,
          delay: delay,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#00a6ff",
          zIndex: 1,
        }}
      />

      {/* Main Content with Slide-Up Effect */}
      <motion.div
        variants={{
          hidden: { opacity: 0, translateY: 50 },  
          visible: { opacity: 1, translateY: 0 },  
        }}
        transition={{
          duration: 0.2, 
          delay: delay + 0.5, 
          ease: "easeOut", 
        }}
        initial="hidden"
        animate={controls}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
