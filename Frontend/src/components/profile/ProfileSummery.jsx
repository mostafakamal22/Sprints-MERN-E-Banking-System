import React from "react";
import { BiUserCircle } from "react-icons/bi";

export default function ProfileSummery({ info }) {
  return (
    <div className="bg-white shadow rounded p-3 py-10 border-t-4 border-yellow-400 ">
      <h2 className="text-gray-900 flex items-center text-2xl mb-4">
        <BiUserCircle size={35} className="mr-1" />
        {info.name}
      </h2>

      <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm w-full max-w-[550px]">
        <li className="flex items-center py-3">
          <span>Status</span>
          <span className="ml-auto">
            <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
              {!info.userStatus && "Active"}
            </span>
          </span>
        </li>
        <li className="flex items-center py-3">
          <span>Member since</span>
          <span className="ml-auto">
            {new Date(info.createdAt).toLocaleDateString()}
          </span>
        </li>
      </ul>
    </div>
  );
}
