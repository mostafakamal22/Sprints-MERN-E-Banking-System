import React from "react";
import { useSelector } from "react-redux";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileSummery from "../components/profile/ProfileSummery";

export default function ProfilePage() {
  const { info } = useSelector((state) => state.userData);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full bg-gray-200 px-6 py-12 max-w-[992px] m-4 md:m-10 rounded shadow">
        {/*profile summery */}
        <ProfileSummery info={info} />

        <div className="my-10"></div>

        {/* Profile Info section */}
        <ProfileInfo info={info} />
      </div>
    </div>
  );
}
