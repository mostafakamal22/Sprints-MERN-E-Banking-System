import React from "react";
import { RiArrowUpFill } from "react-icons/ri";

export const ScrollToTopBtn = ({ startAnimation }) => {
  return (
    <a
      title="Scroll To Top"
      href="#"
      className={`fixed right-4 bottom-4 md:right-8 md:bottom-8 z-20 w-10 h-10  md:h-12 md:w-12 curser-pointer bg-slate-300 flex justify-center items-center rounded-full shadow-2xl animate-bounce transition-all duration-300 ease-in-out ${
        startAnimation ? "opacity-100" : "opacity-0 bottom-full md:bottom-full"
      }`}
    >
      <RiArrowUpFill size={20} />
    </a>
  );
};
