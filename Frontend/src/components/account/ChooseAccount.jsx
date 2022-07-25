import React from "react";

export const ChooseAccount = ({ account, accounts, setPreferedAccount }) => {
  return (
    <div className="w-full flex justify-between items-center flex-col  lg:flex-row gap-2 lg:gap-0 p-3  text-white text-center font-semibold bg-blue-500 border-r-4 border-blue-800 rounded shadow">
      {accounts && accounts.length > 0 && (
        <>
          <p className="w-full lg:w-auto bg-slate-900  px-4 py-2 rounded-md">
            Choose Account
          </p>
          <select
            value={accounts.indexOf(account._id) + 1}
            onChange={(e) => setPreferedAccount(e.target.value - 1)}
            className="w-full lg:w-auto bg-white text-gray-800 text-center  px-4 py-2 rounded-md"
          >
            {accounts.map((account, index) => (
              <option key={account} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};
