import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import f1 from "../../assets/f1.png";
import f2 from "../../assets/f2.png";
import f3 from "../../assets/f3.png";
const slides = [
  { type: "image", value: f1 },
  { type: "image", value: f2 },
  { type: "image", value: f3 },
];

export default function Geser() {
  return (
    <main className="app w-full flex justify-center rounded-xl mb-7">
      <div className="rounded-xl w-[1170px] flex items-center justify-center">
        <Carousel autoSlide={false} className="">
          {slides.map((item, index) => (
            <div
              key={index}
              className={`w-[1170px] h-[159px] rounded-xl flex items-center justify-center ${
                item.type === "color" ? item.value : "bg-white"
              }`}
            >
              {item.type === "image" ? (
                <img
                  src={item.value}
                  alt={`Slide ${index + 1}`}
                  className="w-[1170px] h-[159px] rounded-xl"
                />
              ) : null}
            </div>
          ))}
        </Carousel>
      </div>
    </main>
  );
}

function Carousel({
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
    <div className="overflow-hidden relative rounded-xl">
      <div
        className="flex transition-transform ease-in-out duration-1000"
        style={{
          transform: `translateX(-${current * 100}%)`,
          width: `${slides.length * 100}%`,
          willChange: "transform",
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {slide}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prevSlide}
          className="text-white/80 transition-all duration-200 ease-in-out hover:text-white shadow-2xl text-3xl hover:text-4xl hover:ml-[-10px]"
        >
          <FontAwesomeIcon icon={faChevronCircleLeft} />
        </button>
        <button
          onClick={nextSlide}
          className="text-white/80 transition-all duration-200 ease-in-out hover:text-white shadow-2xl text-3xl hover:text-4xl hover:mr-[-10px]"
        >
          <FontAwesomeIcon icon={faChevronCircleRight} />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-3 h-3 bg-white rounded-full ${
                current === i ? "p-2" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
