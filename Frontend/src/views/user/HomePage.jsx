import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Account } from "../../components/account/Account";
import { MainSpinner } from "../../components/shared/MainSpinner";
import { SideNavbar } from "../../components/shared/SideNavbar";
import {
  getAccount,
  resetAccountStatus,
} from "../../features/Account/AccountSlice";
import { resetAuthStatus } from "../../features/Auth/authSlice";
import { resetUserStatus } from "../../features/User/userSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";

export const HomePage = () => {
  //state for prefered account
  const [preferedAccount, setPreferedAccount] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const { isLoading } = useSelector((state) => state.userData);
  const info = useSelector((state) => state.userData.info);

  //Get account data
  useEffect(() => {
    if (info && info.accounts.length > 0) {
      const payload = {
        token: user.token,
        accountId: info.accounts[preferedAccount],
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

  if (isLoading) return <MainSpinner />;

  return (
    <div className="min-h-screen  flex flex-no-wrap">
      {/* side navabr */}
      <SideNavbar user={info} />

      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full flex justify-center items-center flex-col gap-6 p-4 md:px-20 md:py-10">
          <Account setPreferedAccount={setPreferedAccount} />
        </div>
      </div>
    </div>
  );
};
