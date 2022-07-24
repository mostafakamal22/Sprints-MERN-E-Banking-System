import React from "react";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ReactComponent as NotFoundSVG } from "../assets/imgs/E-BANK-404.svg";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center p-10 md:px-20 md:py-10">
      <div className="max-w-5xl w-full flex flex-col justify-center items-center p-6 bg-amber-50 rounded shadow-lg shadow-black/30 border-y-4 border-amber-800">
        <NotFoundSVG className="max-w-4xl my-1 w-full" />
        <h2 className="text-2xl md:text-3xl text-center font-bold text-blue-900 mb-3">
          Page Not Found
        </h2>

        <Link
          to="/"
          className="flex font-bold text-xs sm:text-sm bg-blue-800 text-white hover:bg-white my-5 px-2 sm:px-3 py-2 hover:text-blue-800 border hover:border-blue-800 items-center rounded
         shadow transition-all ease-in-out duration-300"
        >
          Go Home
          <AiFillHome className="ml-1" size={20} />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
