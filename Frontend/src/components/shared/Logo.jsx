import React from "react";
import { FcLightAtTheEndOfTunnel } from "react-icons/fc";

export const Logo = ({ textSize = null, bg = true }) => {
  return (
    <div
      className={`${
        bg && "bg-blue-200 border-x-4 border-blue-800  shadow rounded"
      } w-full flex justify-center items-center p-2  select-none`}
    >
      <FcLightAtTheEndOfTunnel className="-mr-2" size={45} />
      <span
        className={`${
          textSize ? textSize : "text-3xl"
        } p-1  text-blue-800 font-bold `}
      >
        E-BANK
      </span>
    </div>
  );
};
