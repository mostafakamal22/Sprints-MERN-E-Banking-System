import React from "react";
import { useSelector } from "react-redux";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileSummery from "../components/profile/ProfileSummery";

export default function ProfilePage() {
  const { info } = useSelector((state) => state.data);

  return (
    <div className="bg-gray-200 mx-auto py-10 px-5">
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full max-w-[992px] mx-auto">
          {/*profile summery */}
          <ProfileSummery info={info} />

          <div className="my-10"></div>

          {/* Profile Info section */}
          <ProfileInfo info={info} />

          <div className="my-10"></div>

          {/* Accounts section */}
        </div>
      </div>
    </div>
  );
}
