import React, { useEffect, useState } from 'react'
import styles from './testimonialsSlider.module.css'
import { createTheme, useMediaQuery } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

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
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isComputer = useMediaQuery(theme.breakpoints.up('md'));

  const customButtonStyles = {
    color: 'red',
    background: '#6F6B71',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
  };

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        initialSlide={1}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className={styles.swiper}
        speed={800}
      >
        {data.map((testimonial, index) => (
          <SwiperSlide key={testimonial.id} className={styles.swiperSlide}>
            <div className={styles.container}>
              <div className={styles.quote} >{testimonial.testimonial}</div>
              <div className={styles.quoter} >{testimonial.name}</div>
              <div className={styles.info} >{testimonial.job}</div>
              {/* <div className={styles.info} >{testimonial.role} | {testimonial.company}</div> */}
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev swiper-button-prev-custom" style={{...customButtonStyles, marginTop: isMobile ? '100px' : '80px'}}></div>
        <div className="swiper-button-next swiper-button-next-custom" style={{...customButtonStyles, marginTop: isMobile ? '100px' : '80px'}}></div>
      </Swiper>
    </div>
  )
}

export default TestimonialsSlider