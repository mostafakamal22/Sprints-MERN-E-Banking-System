import React from "react";
import { FcLightAtTheEndOfTunnel } from "react-icons/fc";

export const Logo = () => {
  return (
    <div className="w-full flex justify-center items-center p-2 bg-blue-200 border-x-4 border-blue-800  shadow rounded select-none">
      <FcLightAtTheEndOfTunnel className="-mr-2" size={45} />
      <span className="p-1 text-3xl text-blue-800 font-bold ">E-BANK</span>
    </div>
  );
};
