import React from "react";
import SmallSpinner from "./SmallSpinner";

export default function FormButton({ text, isLoading }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="
      w-full
      flex
      items-center
      justify-center
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-bold
      text-md
      leading-tight
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      disabled:cursor-not-allowed
      transition
      duration-150
      ease-in-out"
    >
      <span className="inline-block ">
        {isLoading ? text.loading : text.default}
      </span>{" "}
      <SmallSpinner isLoading={isLoading} />
    </button>
  );
}
