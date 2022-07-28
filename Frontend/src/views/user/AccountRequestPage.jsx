import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountRequest } from "../../components/forms/userForms/AccountRequest";
import { SideNavbar } from "../../components/shared/SideNavbar";
import { resetUserStatus } from "../../state/features/User/UserData/userSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";

export const AccountRequestPage = () => {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.userData);

  //clean up status (when mount and unmount)
  UseResetStatus(() => {
    dispatch(resetUserStatus());
  });

  UseResetStatus(() => {
    return () => {
      dispatch(resetUserStatus());
    };
  });

  return (
    <div className="min-h-screen  flex flex-no-wrap">
      {/* side navabr */}
      <SideNavbar user={info} />

      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full flex justify-center items-center flex-col gap-6 p-4 md:px-20 md:py-10">
          <AccountRequest />
        </div>
      </div>
    </div>
  );
};
