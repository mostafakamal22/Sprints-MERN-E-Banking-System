import React from "react";
import { useSelector } from "react-redux";
import { MainSpinner } from "../../components/shared/MainSpinner";
import { SideNavbar } from "../../components/shared/SideNavbar";
import { UnactiveSuspendedUser } from "../../components/shared/UnactiveSuspendedUser";

export const UnactiveSuspendedUserPage = () => {
  const { isLoading } = useSelector((state) => state.userAuth);
  const info = useSelector((state) => state.userData.info);

  if (isLoading)
    return (
      <div className="mx-5 h-min-screen">
        <div className="max-w-5xl w-full h-full flex justify-center items-center mx-auto my-10 p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
          <div className="flex justify-center items-center">
            <MainSpinner />
          </div>
        </div>
      </div>
    );

  if (info)
    return (
      <div className="min-h-screen  flex flex-no-wrap">
        {/* side navabr */}
        <SideNavbar user={info} />

        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full flex justify-center items-center flex-col gap-6 p-4 md:px-20 md:py-10">
            <UnactiveSuspendedUser userStatus={info.userStatus} />
          </div>
        </div>
      </div>
    );
};
