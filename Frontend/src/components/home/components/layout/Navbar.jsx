import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillCloseCircle, AiFillHome } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogIn } from "react-icons/io5";
import { MdReviews } from "react-icons/md";
import { Link } from "react-router-dom";
import { Logo } from "../../../shared/Logo";

const navItems = ["Home", "About", "Reviews"];
const navIcons = [
  <AiFillHome size={25} className="mb-1 mr-1" />,
  <BsInfoCircleFill size={25} className="mb-1 mr-1" />,
  <MdReviews size={25} className="mr-1" />,
];

export default function Navbar() {
  //navbar opened/closed state
  const [isOpen, setIsOpen] = useState(false);
  //navbar scroll when active state
  const [navbar, setNavbar] = useState(false);

  const navRef = useRef(null);
  const OpenBtnRef = useRef(null);

  useEffect(() => {
    //navbar scroll changeBackground function
    const changeBackground = () => {
      if (window.scrollY > 100) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };
    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  useEffect(() => {
    //Close Navbar When Click outside it.
    const closeNavbar = (e) => {
      if (
        !navRef?.current?.contains(e.target) &&
        !OpenBtnRef?.current?.contains(e.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", closeNavbar);

    return () => {
      document.removeEventListener("click", closeNavbar);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`${
          navbar ? "bg-slate-50 shadow-lg " : " bg-transparent "
        }  fixed z-50 top-0 w-full transition-all duration-300 ease-in-out`}
      >
        <nav className="max-w-[1800px] w-full mx-auto px-4 sm:px-10 md:px-12 py-2 md:py-4 flex justify-between items-center z-20">
          <div className="max-w-[200px]">
            <Logo bg={false} textSize="text-lg md:text-2xl lg:text-3xl" />
          </div>

          <div className="hidden lg:flex justify-center items-center gap-4 px-4 text-lg text-slate-800">
            {navItems.map((navItem, index) => (
              <a
                key={navItem}
                className="flex justify-center items-center   p-3 !font-sans font-bold rounded-lg hover:text-white hover:bg-slate-800"
                href={`#${navItem}`}
              >
                {navIcons[index]}
                {navItem}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex justify-end items-center gap-4">
            <Link
              to="/register"
              className="inline-flex font-bold text-xs sm:text-sm bg-teal-800 text-white hover:bg-white px-2 sm:px-3 py-2 hover:text-blue-800 border-2 hover:border-blue-800 items-center rounded-lg
         shadow transition-all ease-in-out duration-300"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="flex gap-1 justify-center items-center font-bold text-xs sm:text-sm bg-blue-800 text-white hover:bg-white px-2 sm:px-3 py-2 hover:text-blue-800 border-2 hover:border-blue-800  rounded-lg
         shadow transition-all ease-in-out duration-300"
            >
              <IoLogIn size={20} />
              Login
            </Link>
          </div>

          <button
            ref={OpenBtnRef}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden focus:outline-none border-2 border-transparent rounded hover:border-slate-900 active:border-slate-900  focus:border-slate-900"
          >
            <GiHamburgerMenu size={30} className="text-slate-900" />
          </button>
        </nav>
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-[55] flex justify-center items-center p-6 bg-slate-700 bg-opacity-50 transition-all duration-300 ease-in-out delay-500
     ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav
          ref={navRef}
          className={`w-full bg-white text-blue-900 transition-all duration-300 ease-in-out flex flex-col gap-4 text-center p-4 shadow rounded ${
            isOpen ? "translate-y-0 scale-100" : "translate-y-[100vh] scale-0"
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden focus:outline-none ml-auto border-2 border-transparent rounded hover:border-red-500 active:border-red-500  focus:border-red-500"
          >
            <AiFillCloseCircle size={35} className="text-red-700" />
          </button>
          {navItems.map((navItem, index) => (
            <a
              key={navItem}
              className="nav-links flex justify-center items-center gap-[1px] py-2 !font-sans font-semibold bg-blue-200 border-x-4 border-blue-800 hover:underline focus:underline hover:text-slate-800 focus:text-slate-800"
              href={`#${navItem}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {navIcons[index]}
              {navItem}
            </a>
          ))}
          <div className="flex justify-center items-center gap-4">
            <Link
              to="/register"
              className="inline-flex font-bold text-xs sm:text-sm bg-teal-800 text-white hover:bg-white px-4 py-2 hover:text-blue-800 border-2  border-teal-800 hover:border-blue-800 items-center rounded-lg
         shadow transition-all ease-in-out duration-300"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="flex gap-1 justify-center items-center font-bold text-xs sm:text-sm bg-blue-800 text-white hover:bg-white px-4  py-2 hover:text-blue-800 border-2 border-blue-800 hover:border-blue-800  rounded-lg
         shadow transition-all ease-in-out duration-300"
            >
              <IoLogIn size={16} />
              Login
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
