"use client";

import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styles from './scrollArrow.module.css';

const ScrollArrow = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const trackerSection = document.getElementById('tracker');
      
      if (trackerSection) {
        const trackerSectionBottom = trackerSection.getBoundingClientRect().bottom;
        
        // if the bottom of the tracker is above the viewport, show the arrow
        if (trackerSectionBottom < window.innerHeight) {
          setShowArrow(true);
        } else {
          setShowArrow(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`${styles.arrowContainer} ${showArrow ? styles.show : ''}`}>
      <FaArrowUp className={styles.arrow} onClick={() => scrollToSection('navbar')} />
    </div>
  );
};

export default ScrollArrow;
