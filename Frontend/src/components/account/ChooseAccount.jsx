import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ChooseAccount = () => {
  //Get Accounts from state
  const accounts = useSelector((state) => state.userData.info.accounts);

  return (
    <div className="flex flex-col min-h-[200px] p-4 md:p-10 m-4 md:m-10 shadow bg-gray-200 rounded text-gray-800 text-center font-bold">
      {/* if there is no accounts */}
      {(!accounts || accounts.length === 0) && (
        <div className="p-5 bg-yellow-300 rounded shadow">
          <p className="my-4">You Do not Have Any Accounts Yet!</p>
          <p>
            <span>Request Account</span>
            <Link
              className="ml-2 underline text-gray-500 hover:text-blue-800"
              to={"/request-account"}
            >
              <span>From Here</span>
              <BiRightArrowAlt className="inline-block ml-auto" size={20} />
            </Link>
          </p>
        </div>
      )}

      {/* display accounts */}
      {accounts && accounts.length > 0 && (
        <div>
          <h3 className="text-lg  bg-blue-200 p-4 rounded shadow">
            Choose Account
          </h3>
          {accounts.map((account) => (
            <Link
              className="block w-full flex justify-center items-center my-5 p-4 rounded shadow bg-blue-500 hover:text-white hover:underline hover:bg-blue-600"
              key={account}
              to={`/account/${account}`}
            >
              <span>{account}</span>
              <BiRightArrowAlt className="inline-block ml-auto" size={20} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
