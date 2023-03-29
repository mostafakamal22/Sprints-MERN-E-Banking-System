import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { MdOutlineSecurity, MdReviews } from "react-icons/md";
import { Link } from "react-router-dom";
import { Logo } from "../../../shared/Logo";
import moment from "moment";

const navIcons = [
  <AiFillHome size={17} className=" mr-1" />,
  <BsInfoCircleFill size={17} className=" mr-1" />,
  <MdReviews size={17} className="mr-1" />,
  <AiFillSetting size={17} className="mr-1" />,
  <MdOutlineSecurity size={17} className="mr-1" />,
];

export default function Footer() {
  return (
    <footer className="py-10 bg-[#0f172a]">
      <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-10 md:px-12">
        <div className="text-center grid grid-cols-1 justify-items-center gap-6 lg:grid-cols-12 lg:gap-0">
          <div className="flex flex-col justify-between gap-4 lg:justify-self-start lg:col-span-3">
            <div className="flex justify-center items-center flex-col gap-4">
              <Logo />
              <p className="text-base !font-sans font-semibold text-teal-500">
                E-Bank is everything you need now!
              </p>
            </div>
            <div className="flex justify-center items-center gap-6">
              <svg
                className="text-white hover:text-blue-800 fill-current cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
              >
                <title>Facebook</title>
                <path d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.793C0 19.506.494 20 1.104 20h9.58v-7.745H8.076V9.237h2.606V7.01c0-2.583 1.578-3.99 3.883-3.99 1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.597-1.496 1.47v1.928h2.989l-.39 3.018h-2.6V20h5.098c.608 0 1.102-.494 1.102-1.104V1.104C20 .494 19.506 0 18.896 0z" />
              </svg>
              <svg
                className="text-white hover:text-blue-800 fill-current cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
              >
                <title>Youtube</title>
                <path d="M10.333 0c-5.522 0-10 4.478-10 10 0 5.523 4.478 10 10 10 5.523 0 10-4.477 10-10 0-5.522-4.477-10-10-10zm3.701 14.077c-1.752.12-5.653.12-7.402 0C4.735 13.947 4.514 13.018 4.5 10c.014-3.024.237-3.947 2.132-4.077 1.749-.12 5.651-.12 7.402 0 1.898.13 2.118 1.059 2.133 4.077-.015 3.024-.238 3.947-2.133 4.077zM8.667 8.048l4.097 1.949-4.097 1.955V8.048z" />
              </svg>
              <svg
                className="text-white hover:text-blue-800 fill-current cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="18"
              >
                <title>Twitter</title>
                <path d="M20.667 2.797a8.192 8.192 0 01-2.357.646 4.11 4.11 0 001.804-2.27 8.22 8.22 0 01-2.606.996A4.096 4.096 0 0014.513.873c-2.649 0-4.595 2.472-3.997 5.038a11.648 11.648 0 01-8.457-4.287 4.109 4.109 0 001.27 5.478A4.086 4.086 0 011.47 6.59c-.045 1.901 1.317 3.68 3.29 4.075a4.113 4.113 0 01-1.853.07 4.106 4.106 0 003.834 2.85 8.25 8.25 0 01-6.075 1.7 11.616 11.616 0 006.29 1.843c7.618 0 11.922-6.434 11.662-12.205a8.354 8.354 0 002.048-2.124z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 py-1 lg:grid-rows-3 lg:ml-4 text-white text-sm lg:text-left lg:justify-self-start lg:col-span-5 lg:gap-x-24 lg:grid-flow-col-dense">
            <a
              className="flex items-center hover:text-blue-400 focus:text-blue-400"
              href="#Home"
            >
              {navIcons[0]}
              Home
            </a>
            <a
              className="flex  items-center hover:text-blue-400 focus:text-blue-400"
              href="#About"
            >
              {navIcons[1]}
              Why E-Bank
            </a>
            <a
              className="flex  items-center hover:text-blue-400 focus:text-blue-400"
              href="#Reviews"
            >
              {navIcons[2]}
              Reviews
            </a>
            <a
              className="flex  items-center hover:text-blue-400 focus:text-blue-400"
              href="#0"
            >
              {navIcons[3]}
              Support
            </a>
            <a
              className="flex  items-center hover:text-blue-400 focus:text-blue-400"
              href="#0"
            >
              {navIcons[4]}
              Privacy Policy
            </a>
          </div>

          <div className="flex flex-col gap-4 justify-between items-center lg:items-end lg:justify-self-end lg:col-span-4">
            <Link
              to="/register"
              className="flex justify-center items-center font-bold text-xl bg-teal-800 text-white hover:bg-white focus:bg-white  px-8 py-4  hover:text-blue-800 focus:text-blue-800 border-2  border-slate-50 hover:border-blue-800  focus:border-blue-800  rounded-lg
              shadow transition-all ease-in-out duration-300"
            >
              <span>Register</span>
            </Link>

            <p className="text-slate-100 text-sm">
              All Rights Reserved ©E-Bank {moment().year()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
