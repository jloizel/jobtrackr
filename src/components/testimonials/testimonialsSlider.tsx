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
  const [isAtStart, setIsAtStart] = useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

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

  const handleSlideChange = () => {
    if (!swiperInstance) return;
    setIsAtStart(swiperInstance.isBeginning);
    setIsAtEnd(swiperInstance.isEnd);
  };

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        initialSlide={1}
        spaceBetween={20}
        modules={[Navigation]}
        className={styles.swiper}
        speed={800}
        onSlideChange={handleSlideChange}
        onSwiper={setSwiperInstance}
        loop={true}
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
        {/* <div className="swiper-button-prev swiper-button-prev-custom" style={{...customButtonStyles, marginTop: isMobile ? '100px' : '80px'}}></div>
        <div className="swiper-button-next swiper-button-next-custom" style={{...customButtonStyles, marginTop: isMobile ? '100px' : '80px'}}></div> */}
      </Swiper>
      <div className={styles.arrowsContainer}>
        <PrevArrow swiper={swiperInstance} className={styles.customPrevArrow}/>
        <NextArrow swiper={swiperInstance} className={styles.customNextArrow}/>
      </div>
    </div>
  )
}

export default TestimonialsSlider