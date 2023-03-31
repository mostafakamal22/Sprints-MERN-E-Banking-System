import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { FcCancel, FcSynchronize } from "react-icons/fc";
import { Link } from "react-router-dom";

export const UnactiveSuspendedUser = ({ userStatus }) => {
  return (
    <div className="max-w-2xl w-full flex flex-col justify-center items-center text-base md:text-lg font-semibold text-center text-red-500 bg-red-100 border border-red-200 rounded p-4 mb-6">
      {userStatus === 1 && <FcSynchronize size={150} />}
      {userStatus === 2 && <FcCancel size={150} />}

      <div className="w-full my-4 text-base md:text-xl text-center font-semibold">
        <p>
          Your Bank Account Has Been{" "}
          {userStatus === 1 ? (
            <span className="text-orange-600 font-bold underline">
              Inactive!
            </span>
          ) : (
            <span className="text-red-900 font-bold underline">Suspended!</span>
          )}
        </p>
        <p>You Won't Be Able To Make Any Account Related Actions.</p>
        <p className="mt-5">For More Information, Try Contact Our Support.</p>
      </div>

      <Link
        className="self-end mt-10  inline-flex font-bold text-xs sm:text-sm bg-blue-700 text-white hover:bg-white px-2 sm:px-3 py-2 hover:text-blue-600 border hover:border-blue-800 items-center rounded
          shadow transition-all ease-in-out duration-300"
        to={"/contact"}
      >
        <span>Contact Support</span>
        <BiRightArrowAlt className="inline-block ml-auto" size={20} />
      </Link>
    </div>
  );
};
