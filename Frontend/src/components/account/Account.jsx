import React, { useEffect, useState } from "react";
import { FcHome } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { MainSpinner } from "../shared/MainSpinner";
import MessagesContainer from "../shared/MessagesContainer";
import { AccountDetails } from "./AccountDetails";
import { ChooseAccount } from "./ChooseAccount";
import { NoAccountYet } from "./NoAccountYet";
import {
  getAccount,
  resetAccountStatus,
} from "../../state/features/Account/accountSlice";
import { resetUserStatus } from "../../state/features/User/UserData/userSlice";
import { resetAuthStatus } from "../../state/features/User/Auth/authSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";

export const Account = () => {
  const dispatch = useDispatch();

  const { info, isLoading: isUserDataLoading } = useSelector(
    (state) => state.userData
  );
  const {
    account,
    isError,
    isLoading: isUserAccountLoading,
    message,
  } = useSelector((state) => state.userAccount);
  const { user } = useSelector((state) => state.userAuth);

  const accountId = account?._id
    ? account?._id
    : info?.accounts?.length > 0
    ? info?.accounts[0]
    : null;

  //state for prefered account
  const [preferedAccount, setPreferedAccount] = useState(accountId);

  //Get account data
  useEffect(() => {
    if (info && info.accounts.length > 0 && preferedAccount) {
      const payload = {
        token: user.token,
        accountId: info.accounts.find(
          (account) => account === preferedAccount.toString()
        ),
      };
      dispatch(getAccount(payload));
    }
  }, [info, preferedAccount]);

  //clean up user status on unmount
  UseResetStatus(() => {
    return () => {
      dispatch(resetUserStatus());
      dispatch(resetAuthStatus());
      dispatch(resetAccountStatus());
    };
  });

  const spinnerSize = window.innerWidth < 400 ? 30 : 45;

  if (isUserAccountLoading || isUserDataLoading)
    return (
      <div className="w-full min-h-screen">
        <div className="max-w-5xl w-full h-full min-h-screen flex justify-center items-center mx-auto">
          <div className="flex justify-center items-center">
            <MainSpinner spinnerSize={spinnerSize} />
          </div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="max-w-5xl w-full">
        <MessagesContainer msg={message} isError={isError} />
      </div>
    );

  //No Account yet
  if (
    !account &&
    !info?.accounts?.length &&
    (!isUserAccountLoading || !isUserDataLoading)
  )
    return <NoAccountYet />;

  if (account && !isUserAccountLoading && !isUserDataLoading)
    return (
      <div className="max-w-5xl w-full">
        <h3 className="flex justify-center items-center text-3xl my-5 px-6 py-3 text-center font-bold bg-blue-200 text-blue-900 border-x-4 border-blue-800 rounded shadow">
          <FcHome className="mr-1" size={45} />
          <span>Home</span>
        </h3>

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
