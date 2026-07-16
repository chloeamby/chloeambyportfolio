import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export default function Home() {
  // 1. Array holding your two featured images
  const featuredImages = [
    {
      src: "/assets/IMG_3773.jpg",
      alt: "Chloe Rivera Parts Model Portfolio - Hand Jewelry",
    },
    {
      src: "/assets/IMG_3806.jpg", // Make sure this file exists in assets!
      alt: "Chloe Rivera Parts Model Portfolio - Footwear Close-up",
    },
  ];

  // 2. React state to keep track of the current image index (0 or 1)
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3. Navigation Functions
  const prevSlide = () => {
    // If on image 0, go to the last image. Otherwise, go back 1.
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? featuredImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    // If on the last image, go to image 0. Otherwise, go forward 1.
    const isLastSlide = currentIndex === featuredImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="mt-20" id="home">
      {/* Added gap-8 to ensure columns don't collide */}
      <div className="flex justify-between py-10 items-center px-5 lg:px-28 lg:flex-row flex-col-reverse gap-8">
        
        {/* Left Text Block */}
        <motion.div
          className="lg:w-[45%] w-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Removed 'text-nowrap' so your text wraps cleanly on smaller screens */}
          <motion.div className="text-2xl lg:text-5xl flex flex-col mt-8 lg:mt-0 gap-2 lg:gap-5">
            <motion.h2 className="font-semibold">Chloe Rivera</motion.h2>
            <motion.h2>
              <span className="font-bold">Parts</span>{" "}
              <span className="font-bold">Model</span>{" "}
            </motion.h2>
            <motion.h2>Canada & <span className="font-extrabold">California.</span></motion.h2>
          </motion.div>

          {/* Stacking the Specs professionally */}
          <motion.div
            className="text-[#71717A] text-sm lg:text-base mt-5 flex flex-col gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            
          </motion.div>

        </motion.div>

        {/* Right Feature Carousel Block */}
        <motion.div
          className="lg:w-[55%] w-full aspect-[4/3] group relative overflow-hidden rounded-xl border border-gray-200 shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* A. The Image Display */}
          <img
            className="h-full w-full object-cover"
            src={featuredImages[currentIndex].src}
            alt={featuredImages[currentIndex].alt}
          />

          {/* B. The Navigation Controls (Overlayed) */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            
            {/* Left Translucent Circle Button */}
            <button
              onClick={prevSlide}
              className="bg-white/20 text-white p-2 rounded-full backdrop-blur-sm 
                        hover:bg-white/40 transition-colors shadow-inner"
            >
              <IoChevronBackOutline size={28} />
            </button>

            {/* Right Translucent Circle Button */}
            <button
              onClick={nextSlide}
              className="bg-white/20 text-white p-2 rounded-full backdrop-blur-sm 
                        hover:bg-white/40 transition-colors shadow-inner"
            >
              <IoChevronForwardOutline size={28} />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}