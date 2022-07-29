import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Withdraw } from "../../components/account/Withdraw";
import { SideNavbar } from "../../components/shared/SideNavbar";
import { resetAccountStatus } from "../../state/features/Account/accountSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";

export const WithdrawPage = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.userData.info);

  //clean up status (when mount and unmount)
  UseResetStatus(() => {
    dispatch(resetAccountStatus());
  });

  UseResetStatus(() => {
    return () => {
      dispatch(resetAccountStatus());
    };
  });
  return (
    <div className="min-h-screen  flex flex-no-wrap">
      {/* side navabr */}
      <SideNavbar user={info} />

      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full flex justify-center items-center flex-col gap-6 p-4 md:px-20 md:py-10">
          <Withdraw />
        </div>
      </div>
    </div>
  );
};
