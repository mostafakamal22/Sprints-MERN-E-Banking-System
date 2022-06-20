import React from "react";

export default function MessagesContainer({ msg, isSuccess }) {
  return (
    <div
      className={`${
        isSuccess ? "text-green-800 " : "text-red-800 "
      } flex justify-center items-center text-center my-2 min-h-[30px]`}
    >
      {msg}
    </div>
  );
}
