import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { FcExpired } from "react-icons/fc";
import { Link } from "react-router-dom";

export const NoAccountYet = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 max-w-5xl min-h-[350px] w-full p-6 bg-slate-50 border rounded">
      <FcExpired size={150} />

      <p className="w-full text-lg font-semibold text-center text-red-500 bg-red-100 border border-red-200 rounded p-4 mb-6">
        You do not have any accounts yet!
      </p>

      <Link
        className="self-end mt-auto  inline-flex font-bold text-xs sm:text-sm bg-blue-700 text-white hover:bg-white px-2 sm:px-3 py-2 hover:text-blue-600 border hover:border-blue-800 items-center rounded
            shadow transition-all ease-in-out duration-300"
        to={"/account-request"}
      >
        <span>Request Account</span>
        <BiRightArrowAlt className="inline-block ml-auto" size={20} />
      </Link>
    </div>
  );
};
