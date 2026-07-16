import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [hasShadow, setHasShadow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 110,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  // The active sections in your preferred order: Gallery first, and Contact mapped to the "contact" ID.
  const navigationSections = ["gallery", "about", "contact"];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed lg:px-28 px-5 top-0 left-0 w-full z-50 bg-white p-5 transition-shadow duration-300 ${
        hasShadow ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.img
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection("home")}
          className="h-9 cursor-pointer"
          src="/assets/logo.svg"
          alt="Logo"
        />

        {/* Desktop Menu Wrapper */}
        <div className="hidden lg:flex items-center gap-x-10">
          <ul className="flex items-center gap-x-7 font-semibold">
            {navigationSections.map((section) => (
              <motion.li
                key={section}
                className="group"
                whileHover={{ scale: 1.1 }}
              >
                <button onClick={() => scrollToSection(section)}>
                  {section === "contact" ? "Socials" : section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
                <motion.span
                  className="w-0 transition-all duration-300 group-hover:w-full h-[2px] bg-black flex"
                  layout
                ></motion.span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Mobile Hamburger Trigger */}
        <motion.button
          className="lg:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.2 }}
        >
          {isOpen ? <HiX /> : <HiOutlineMenu />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow"
          >
            <button
              className="absolute top-5 right-5 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              <HiX />
            </button>
            <ul className="flex flex-col items-start ml-16 mt-28 h-full gap-y-6 font-semibold">
              {navigationSections.map((section) => (
                <motion.li
                  key={section}
                  className="border-b w-[80%] pb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <button onClick={() => scrollToSection(section)}>
                    {section === "contact" ? "Socials" : section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}