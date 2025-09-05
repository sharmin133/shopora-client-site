import { useEffect, useState } from "react";

const sliderImages = [
"https://i.ibb.co.com/r2fgmRpt/bible-5124602-1920.jpg",
  "https://i.ibb.co.com/rGw0gVzC/cosmetics-1543276-1920.jpg",
  "https://i.ibb.co.com/SDsYRxGR/pocket-watch-1637392-1920.jpg",

  "https://i.ibb.co.com/zhZcBj0b/cosmetic-oil-3197276-1920.jpg",
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto Slider Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-[30vh] md:h-[90vh] overflow-hidden bg-black">
      {/* Slider Section */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }} 
      >
        {sliderImages.map((img, index) => (
          <div
            key={index}
            className="w-screen h-full flex-shrink-0 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
