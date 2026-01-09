"use client";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-primary-content rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </>
  );
}