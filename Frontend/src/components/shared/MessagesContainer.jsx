import React from "react";

export default function MessagesContainer({ msg, isSuccess, isError }) {
  return (
    <div
      className={`
      ${isSuccess && "bg-[#36D399]"} 
      ${isError && "bg-[#F87272]"}
      flex justify-center items-center min-h-[20px] text-center text-black font-semibold my-2 p-5  rounded-md shadow-md`}
    >
      {/* isSuccess Icon */}
      {isSuccess && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}

      {/* isError Icon */}
      {isError && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}

      <span>
        {isError && `Error! ${msg}`}
        {isSuccess && msg}
      </span>
    </div>
  );
}
