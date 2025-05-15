import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa"; // Icons

// Import images
import js1 from "../assets/js1.jpg";
import html from "../assets/html.jpg";
import css from "../assets/css.jpg";
import ajs from "../assets/ajs.jpg";
import react1 from "../assets/react1.jpg";

const AnimatedCardSlider = () => {
  const slides = [
    { img: html, title: "HTML" },
    { img: css, title: "CSS" },
    { img: js1, title: "JavaScript" },
    { img: ajs, title: "Advanced JS" },
    { img: react1, title: "React" },
  ];

  const swiperRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => {
    if (swiperRef.current) {
      if (isPaused) {
        swiperRef.current.autoplay.start();
      } else {
        swiperRef.current.autoplay.stop();
      }
      setIsPaused(!isPaused);
    }
  };

  return (
    <div className="relative w-full mt-0">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay]}
        spaceBetween={"1%"} 
        slidesPerView={3} 
        navigation
        autoplay={{ delay: 1500, disableOnInteraction: false }} 
        loop={true}
        speed={800} 
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="relative w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="w-full h-[290px] flex flex-col items-center justify-center bg-white shadow-md border-4 border-yellow-500 rounded-md">
              <img src={slide.img} alt={slide.title} className="w-full h-[220px] object-cover rounded-t-md" />
              <h2 className="text-lg font-semibold py-2">{slide.title}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pause Button Below Cards */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px] cursor-pointer text-gray-700 hover:text-blue-500"
        onClick={togglePause}
      >
        {isPaused ? <FaPlayCircle className="text-4xl" /> : <FaPauseCircle className="text-4xl" />}
      </div>
    </div>
  );
};

export default AnimatedCardSlider;
