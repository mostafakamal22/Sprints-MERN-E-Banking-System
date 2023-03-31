import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Account } from "../../components/account/Account";
import { MainSpinner } from "../../components/shared/MainSpinner";
import { SideNavbar } from "../../components/shared/SideNavbar";
import {
  getAccount,
  resetAccountStatus,
} from "../../state/features/Account/accountSlice";
import { resetAuthStatus } from "../../state/features/User/Auth/authSlice";
import { resetUserStatus } from "../../state/features/User/UserData/userSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const { isLoading } = useSelector((state) => state.userData);
  const info = useSelector((state) => state.userData.info);
  const { account } = useSelector((state) => state.userAccount);

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

  if (isLoading)
    return (
      <div className="w-full min-h-screen bg-slate-50">
        <div className="max-w-5xl w-full h-full min-h-screen flex justify-center items-center mx-auto">
          <div className="flex justify-center items-center">
            <MainSpinner spinnerSize={spinnerSize} />
          </div>
        </div>
      </div>
    );

  if (info)
    return (
      <div className="min-h-screen  flex flex-no-wrap">
        {/* side navbar */}
        <SideNavbar user={info} />

        <div className="w-full h-full min-h-screen self-center flex justify-center items-center">
          <div className="w-full h-full min-h-screen flex justify-center items-center p-3 md:p-6 bg-slate-50">
            <Account setPreferedAccount={setPreferedAccount} />
          </div>
        </div>
      </div>
    );
};
