import React from "react";
import { useSelector } from "react-redux";
import { RetrieveBalance } from "../../components/account/RetrieveBalance";
import { SideNavbar } from "../../components/shared/SideNavbar";

export const RetrieveBalancePage = () => {
  const info = useSelector((state) => state.userData.info);

  return (
    <div className="min-h-screen  flex flex-no-wrap">
      {/* side navabr */}
      <SideNavbar user={info} />

      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full flex justify-center items-center flex-col gap-6 p-4 md:px-20 md:py-10">
          <RetrieveBalance />
        </div>
      </div>
    </div>
  );
};
