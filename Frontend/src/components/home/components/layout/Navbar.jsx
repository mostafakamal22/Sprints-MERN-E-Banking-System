import React from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  //navbar scroll when active state
  const [navbar, setNavbar] = useState(false);

  //navbar scroll changeBackground function
  const changeBackground = () => {
    if (window.scrollY > 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, [changeBackground]);

  return (
    <>
      <div
        className={`${
          navbar ? "bg-slate-50 shadow-lg " : " bg-transparent "
        }  fixed z-50 top-0 w-full transform transition-all duration-300 ease-in-out`}
      >
        <nav className="max-w-[1800px] w-full mx-auto px-4 sm:px-10 md:px-12 py-2 md:py-4 flex justify-between items-center z-20">
          <div className="max-w-[200px]">
            <Logo bg={false} textSize="text-lg md:text-2xl lg:text-3xl" />
          </div>

          <div className="hidden lg:flex justify-center items-center gap-4 px-4 text-lg text-slate-800">
            {navItems.map((navItem, index) => (
              <a
                key={navItem}
                className="flex justify-center items-center p-3 !font-sans font-bold rounded-lg hover:text-white hover:bg-slate-800"
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
              className="inline-flex font-bold text-xs sm:text-sm bg-blue-800 text-white hover:bg-white px-2 sm:px-3 py-2 hover:text-blue-800 border-2 hover:border-blue-800 items-center rounded-lg
         shadow transition-all ease-in-out duration-300"
            >
              Login
              <IoLogIn size={20} />
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden focus:outline-none"
          >
            <GiHamburgerMenu
              size={30}
              className={`${isOpen && "hidden"}  text-slate-900`}
            />
          </button>
        </nav>
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-30 bg-slate-700 bg-opacity-50 
     ${isOpen ? "block" : "hidden"}`}
      >
        <div className="bg-white text-blue-900  flex flex-col gap-4 text-center  my-[77px] p-4 shadow rounded">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden focus:outline-none ml-auto"
          >
            <AiFillCloseCircle
              size={35}
              className={`${isOpen ? "block" : "hidden"} text-rose-700`}
            />
          </button>
          {navItems.map((navItem, index) => (
            <a
              key={navItem}
              className="flex justify-center items-center gap-[1px] py-2 !font-sans font-semibold bg-blue-200 border-x-4 border-blue-800 hover:underline focus:underline hover:text-slate-800 focus:text-slate-800"
              href={`#${navItem}`}
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
              className="inline-flex font-bold text-xs sm:text-sm bg-blue-800 text-white hover:bg-white px-4  py-2 hover:text-blue-800 border-2 border-blue-800 hover:border-blue-800 items-center rounded-lg
         shadow transition-all ease-in-out duration-300"
            >
              Login
              <IoLogIn size={20} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
