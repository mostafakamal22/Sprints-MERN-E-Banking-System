import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Buttons = ({ title }) => {
  const navigate = useNavigate();

  const location = useLocation();

  if (location?.pathname === "/" || location?.pathname === "/login")
    return null;

  return (
    <div className="md:hidden w-full flex justify-between items-center gap-1 p-3 bg-slate-50">
      <Link
        to={"/"}
        className="inline-flex font-bold text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 text-blue-500 items-center rounded
         shadow  focus:outline-none hover:bg-blue-500 active:bg-blue-500 hover:text-white
          "
      >
        <AiFillHome className="mb-[-1px] mr-1 font-bold" size={15} />
        Home
      </Link>

      {title && title !== "Home" && (
        <span className="text-xs text-blue-500 text-center bg-white p-2 font-bold rounded shadow">
          {title ? title.toUpperCase() : ""}
        </span>
      )}

      <button
        onClick={() => navigate(-1)}
        className="inline-flex font-bold text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 text-blue-500 items-center rounded
         shadow  focus:outline-none hover:bg-blue-500 active:bg-blue-500 hover:text-white
          "
      >
        <BiArrowBack className="mb-[-1px] mr-1 font-bold" size={15} />
        Go Back
      </button>
    </div>
  );
};
