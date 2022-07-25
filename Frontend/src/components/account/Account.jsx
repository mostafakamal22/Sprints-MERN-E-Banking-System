import React from "react";
import { FcHome } from "react-icons/fc";
import { useSelector } from "react-redux";
import { MainSpinner } from "../shared/MainSpinner";
import MessagesContainer from "../shared/MessagesContainer";
import { AccountDetails } from "./AccountDetails";
import { ChooseAccount } from "./ChooseAccount";
import { NoAccountYet } from "./NoAccountYet";

export const Account = ({ setPreferedAccount }) => {
  const { info } = useSelector((state) => state.userData);
  const { account, isError, isLoading, message } = useSelector(
    (state) => state.userAccount
  );

  if (isLoading)
    return (
      isLoading && (
        <div className="max-w-5xl w-full p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
          <div className="p-20 flex justify-center items-center">
            <MainSpinner />
          </div>
        </div>
      )
    );

  if (isError)
    return (
      <div className="max-w-5xl w-full p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
        <MessagesContainer msg={message} isError={isError} />
      </div>
    );

  //No Account yet
  if (!account || !info?.accounts?.length) return <NoAccountYet />;

  if (account && !isLoading)
    return (
      <div className="max-w-5xl w-full p-4 bg-slate-50 rounded shadow-lg shadow-black/30">
        <h2 className="flex justify-center items-center text-3xl my-5 px-6 py-3 text-center font-bold bg-blue-200 text-blue-900 border-x-4 border-blue-800 rounded shadow">
          <FcHome className="mr-1" size={45} />
          <span>Home</span>
        </h2>

        {/* Choose Account */}
        <ChooseAccount
          account={account}
          accounts={info.accounts}
          setPreferedAccount={setPreferedAccount}
        />

        {/* Account Details accounts */}
        <AccountDetails account={account} />
      </div>
    );
};
