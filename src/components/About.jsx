import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    // Added significant margin-top (mt-24 lg:mt-32) and padding-top to prevent the gallery from overlapping
    <div className="px-5 lg:px-28 flex justify-between flex-col lg:flex-row gap-10 mt-24 lg:mt-32 pt-10 pb-20" id="about">
      
      {/* Left Column - Featured Image */}
      <motion.div
        className="lg:w-1/2 flex items-center justify-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
        viewport={{ once: true }}
      >
        <img 
          src="/assets/IMG_7310.JPG" 
          alt="Chloe Rivera and Photographer Wife Amby" 
          className="rounded-xl object-cover max-h-[500px] w-full shadow-2xl border border-neutral-800"
        />
      </motion.div>

      {/* Right Column - Bio & Stats */}
      <motion.div
        className="lg:w-1/2 flex flex-col justify-center"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="lg:text-4xl text-2xl mt-4 lg:mt-0 font-semibold tracking-wide">
          About <span className="font-extrabold text-white">Me</span>
        </h2>

        {/* Clear physical specs block */}
        <div className="text-neutral-400 text-sm lg:text-base mt-6 flex flex-col gap-1 border-b border-neutral-800 pb-4">
          <p><span className="text-neutral-500 font-medium">Height:</span> 5'10"</p>
          <p><span className="text-neutral-500 font-medium">Shoe Size:</span> 10 US/43 EU</p>
        </div>

        {/* Bio Copy */}
        <div className="text-[#71717A] text-sm/6 lg:text-base mt-6 flex flex-col gap-4">
          <p>
            I am a parts model split between <span className="text-black font-medium">Calgary, AB</span> and <span className="text-black font-medium">San Diego, CA</span>. My portfolio includes my creative shots.
          </p>

          <p>
            A special thanks to my lovely wife, <span className="text-black font-medium">Amby</span>, who is the talent behind the lens.
          </p>
        </div>
      </motion.div>
    </div>
  );
}