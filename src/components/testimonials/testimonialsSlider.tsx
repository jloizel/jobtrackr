import React, { useEffect, useState } from 'react'
import styles from './testimonialsSlider.module.css'
import { createTheme, useMediaQuery } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';
import { NextArrow, PrevArrow } from '../swiperArrows/swiperArrows';

const TestimonialsSlider: React.FC = ({}) => {
  const [data, setData] = useState([
    {
      id: "",
      name: "",
      job: "",
      company: "",
      testimonial: ""
    }
  ]);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/testimonials.json');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 767,
        md: 1024,
        lg: 1200,
        xl: 1536,
      },
    },
  });


  return (
    <div className={styles.swiperContainer}>
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        initialSlide={1}
        spaceBetween={60}
        modules={[Navigation]}
        className={styles.swiper}
        speed={800}
        onSwiper={setSwiperInstance}
        loop={true}
        autoHeight={true}
      >
        {data.map((testimonial, index) => (
          <SwiperSlide key={testimonial.id} className={styles.swiperSlide}>
            <div className={styles.container}>
              <div className={styles.testimonialContainer}>
                <BiSolidQuoteLeft className={styles.quoteIcon}/>
                <span className={styles.testimonial}>{testimonial.testimonial}</span>
                <BiSolidQuoteRight className={styles.quoteIcon}/>
              </div>
              <div className={styles.detailsContainer}>
                <span className={styles.quoter}>{testimonial.name}</span>
                <span className={styles.info}>{testimonial.job} @ {testimonial.company}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.arrowsContainer}>
        <PrevArrow swiper={swiperInstance} className={styles.customPrevArrow}/>
        <NextArrow swiper={swiperInstance} className={styles.customNextArrow}/>
      </div>
    </div>
  )
}

export default TestimonialsSlider