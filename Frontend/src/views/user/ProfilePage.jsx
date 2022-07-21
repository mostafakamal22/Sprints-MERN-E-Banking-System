import React from "react";
import { useSelector } from "react-redux";
import ProfileInfo from "../../components/profile/ProfileInfo";
import ProfileSummery from "../../components/profile/ProfileSummery";
import { SideNavbar } from "../../components/shared/SideNavbar";

export default function ProfilePage() {
  const { info } = useSelector((state) => state.userData);

  return (
    <div className="min-h-screen  flex flex-no-wrap">
      {/* side navabr */}
      <SideNavbar user={info} />

      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full flex justify-center items-center flex-col gap-6 p-4 md:px-20 md:py-10">
          <div className="max-w-5xl w-full p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
            {/*profile summery */}
            <ProfileSummery info={info} />

            <div className="my-10"></div>

            {/* Profile Info section */}
            <ProfileInfo info={info} />
          </div>
        </div>
      </div>
    </div>
  );
}
