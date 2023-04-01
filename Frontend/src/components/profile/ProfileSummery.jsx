import React from "react";
import { FcBusinessman } from "react-icons/fc";

export default function ProfileSummery({ info }) {
  return (
    <div>
      <h3 className="flex items-center text-gray-800 mb-10 text-xl font-bold px-2 py-4 my-4 rounded shadow bg-blue-200 border-b-4 border-blue-800">
        <FcBusinessman className="mr-1" size={50} />
        {info.name}
      </h3>

      <ul className="w-full max-w-[550px] py-2  mt-3">
        <li className="flex items-center p-3 mb-2  border-r-4  border-blue-800 rounded shadow bg-blue-200">
          <span className="font-semibold">Status</span>
          <span className="ml-auto">
            <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
              {!info.userStatus && "Active"}
            </span>
          </span>
        </li>
        <li className="flex items-center p-3  border-r-4 border-blue-800 rounded shadow bg-blue-200">
          <span className="font-semibold">Member since</span>
          <span className="ml-auto">
            {new Date(info.createdAt).toLocaleDateString()}
          </span>
        </li>
      </ul>
    </div>
  );
}
