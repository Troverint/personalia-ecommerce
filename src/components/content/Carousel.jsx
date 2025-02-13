import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 2500,
}) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };
  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [current, autoSlide, autoSlideInterval]);
  return (
    <div className="overflow-hidden relative w-[80vw]">
      <div className="flex items-center justify-center ">
        <div
          className="flex transition-transform ease-out duration-300 w-[90vw]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides}
        </div>
        <div className="absolute inset-0 flex items-center justify-between  ">
          <button
            onClick={prevSlide}
            className="text-white/80 transition-all duration-200 ease-in-out hover:text-white shadow-2xl text-3xl "
          >
            <FontAwesomeIcon icon={faChevronCircleLeft} className="" />
          </button>
          <button
            onClick={nextSlide}
            className="text-white/80  transition-all duration-200 ease-in-out hover:text-white shadow-2xl text-3xl"
          >
            <FontAwesomeIcon icon={faChevronCircleRight} className="" />
          </button>
        </div>
        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <div
                className={`transition-all w-3 h-3  bg-white rounded-full ${
                  current === i ? "p-2" : "bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
