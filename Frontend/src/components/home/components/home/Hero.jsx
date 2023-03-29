import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="Home" className="relative overflow-hidden bg-slate-50 ">
      <div className="max-w-[1800px] w-full flex px-4 sm:px-10 md:px-12 mx-auto">
        <div className="bg-header-mobile bg-custom-mobile-header-size absolute left-0 bg-top w-full h-full bg-no-repeat lg:hidden"></div>
        <div className="bg-header-desktop absolute -right-[30%]  w-full h-full bg-no-repeat hidden lg:block bg-left"></div>

        <div className="max-w-xl mx-auto lg:mx-0 h-screen relative z-20">
          <div className="h-full flex flex-col justify-center md:justify-end pb-4 lg:pb-0 lg:w-96 lg:justify-center">
            <div className="h-2/3 flex flex-col  backdrop-blur-[2px] bg-white/30 lg:backdrop-blur-none lg:bg-transparent rounded-lg px-2 justify-center items-center text-center lg:items-start lg:text-left">
              <div className="flex flex-col justify-center items-center lg:items-start flex-grow lg:pt-16">
                <h1 className="text-4xl font-bold !font-sans lg:leading-[1.20] lg:text-5xl text-slate-800 lg:text-purple-800 pb-5 drop-shadow-md">
                  <span className="bg-yellow-400 text-teal-700 px-2 rounded">
                    Revolutionize
                  </span>{" "}
                  Your Banking Experience with{" "}
                  <span className="bg-indigo-600 text-white rounded px-2">
                    E-Bank!
                  </span>
                </h1>

                <p className="text-gray-700 !font-sans text-sm md:text-base lg:text-lg leading-5 my-5 drop-shadow">
                  Take your financial life online. Your E-Bank account will be a
                  one-stop-shop for sending, saving, budgeting, withdrawing, and
                  much more.
                </p>
              </div>
              <Link
                to="/register"
                className="flex justify-center items-center font-bold text-xl bg-teal-800 text-white hover:bg-white focus:bg-white mt-auto px-8 py-4  hover:text-blue-800 focus:text-blue-800 border-2  border-teal-800 hover:border-blue-800  focus:border-blue-800  rounded-lg
         shadow transition-all ease-in-out duration-300 mb-5"
              >
                <span>Register</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
