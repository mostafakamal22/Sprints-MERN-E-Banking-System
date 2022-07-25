import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { FcCancel, FcSynchronize } from "react-icons/fc";
import { Link } from "react-router-dom";

export const UnactiveSuspendedUser = ({ userStatus }) => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 max-w-5xl min-h-[350px] w-full p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
      {userStatus === 1 && <FcSynchronize size={150} />}
      {userStatus === 2 && <FcCancel size={150} />}

      <h2
        className={`${
          userStatus === 1
            ? "bg-yellow-200 border-yellow-800"
            : "bg-red-200 border-red-800"
        } w-full my-4 p-6 text-xl text-center font-semibold  border-r-4  rounded shadow`}
      >
        <p className="my-5 p-2">
          Your Bank Account Has Been{" "}
          {userStatus === 1 ? (
            <span className="text-yellow-900 font-bold underline">
              Unactive!
            </span>
          ) : (
            <span className="text-red-900 font-bold underline">Suspended!</span>
          )}
        </p>
        <p className="my-5 p-2">
          You Won't Be Able To Make Any Account Related Actions.
        </p>
        <p className="my-5 p-2">
          For More Information, Try Contact Our Support.
        </p>
      </h2>

      <Link
        className="self-end mt-auto  inline-flex font-bold text-xs sm:text-sm bg-blue-700 text-white hover:bg-white px-2 sm:px-3 py-2 hover:text-blue-600 border hover:border-blue-800 items-center rounded
          shadow transition-all ease-in-out duration-300"
        to={"/contact"}
      >
        <span>Contact Support</span>
        <BiRightArrowAlt className="inline-block ml-auto" size={20} />
      </Link>
    </div>
  );
};
