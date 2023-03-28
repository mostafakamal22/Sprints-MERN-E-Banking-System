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
            value={account._id.toString()}
            onChange={(e) => setPreferedAccount(+e.target.value)}
            className="w-full lg:w-auto bg-white text-gray-800 text-center  px-4 py-2 rounded-md"
          >
            {accounts.map((account) => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};
