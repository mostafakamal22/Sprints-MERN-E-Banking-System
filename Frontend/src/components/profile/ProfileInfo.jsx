import React from "react";
import { AiOutlineProfile } from "react-icons/ai";
import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function ProfileInfo({ info }) {
  return (
    <div className="bg-white px-3 py-10 shadow rounded">
      <div className="flex items-center  text-gray-800 mb-4 text-xl text-center font-bold px-2 py-4 my-4 rounded shadow bg-gray-100 border-b-2 border-blue-600">
        <span className="flex justify-center items-center p-2 mr-2 rounded-full shadow bg-blue-200">
          <AiOutlineProfile size={45} />
        </span>
        <span className="tracking-wide">Client Informations</span>
      </div>
      <div className="text-gray-700">
        <div className="grid md:grid-cols-2 gap-2">
          <div className="grid grid-cols-2 border-r-2 border-blue-600 rounded shadow bg-blue-200">
            <div className="px-4 py-2 font-semibold">First Name</div>
            <div className="px-4 py-2  text-right">
              {info.name.split(" ").at(0)}
            </div>
          </div>
          <div className="grid grid-cols-2 border-r-2 border-blue-600 rounded shadow bg-blue-200">
            <div className="px-4 py-2 font-semibold">Last Name</div>
            <div className="px-4 py-2  text-right">
              {info.name.split(" ").at(-1)}
            </div>
          </div>

          <div className="grid grid-cols-2 border-r-2 border-blue-600 bg-blue-200  rounded shadow ">
            <div className="px-4 py-2 font-semibold ">Address</div>
            <div className="px-4 py-2 text-right">{info.address}</div>
          </div>
          <div className="grid grid-cols-2 border-r-2 border-blue-600 rounded shadow bg-blue-200">
            <div className="px-4 py-2 font-semibold">Email</div>
            <div className="px-4 py-2  text-right">
              <span className="hover:text-yellow-700 hover:underline hover:underline-offset-2">
                {info.email}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 border-r-2 border-blue-600 rounded shadow bg-blue-200">
            <div className="px-4 py-2 font-semibold">Phone Number</div>
            <div className="px-4 py-2  text-right">0{info.phone}</div>
          </div>
        </div>
        <div className="flex justify-end items-center mt-6">
          <Link
            to={`/profile/${info.id}/update`}
            className="inline-flex font-bold text-xs sm:text-sm bg-blue-500 text-white hover:bg-white px-2 sm:px-3 py-2 hover:text-blue-500 border-2 hover:border-blue-500 items-center rounded
         shadow transition-all ease-in-out duration-300"
          >
            Update Information
            <RiArrowRightLine className="mb-[-4px] ml-1 font-bold" size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
