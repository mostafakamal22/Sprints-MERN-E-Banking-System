import React from "react";
import { useSelector } from "react-redux";
import { NotificationOverView } from "../../components/profile/NotificationOverView";
import { SideNavbar } from "../../components/shared/SideNavbar";

export const NotificationsPage = () => {
  const { info } = useSelector((state) => state.userData);

  return (
    <div className="min-h-screen  flex flex-no-wrap">
      {/* side navabr */}
      <SideNavbar user={info} />

      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full flex justify-center items-center flex-col gap-6 p-4 md:px-20 md:py-10">
          <NotificationOverView />
        </div>
      </div>
    </div>
  );
};
