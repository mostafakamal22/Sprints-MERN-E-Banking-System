import React from "react";
import {
  FcBusinessman,
  FcConferenceCall,
  FcNews,
  FcVoicePresentation,
} from "react-icons/fc";
import { useSelector } from "react-redux";

export const DashboardNavbar = ({ activeTab, setActiveTab }) => {
  const navTabs = [
    {
      stateName: "usersList",
      tabName: "Users Control Panel",
      icon: FcConferenceCall,
    },
    {
      stateName: "adminsList",
      tabName: "Admins Control Panel",
      icon: FcVoicePresentation,
    },
    {
      stateName: "usersRequests",
      tabName: "Users Accounts Request",
      icon: FcNews,
    },
    {
      stateName: "addAdmin",
      tabName: "Add New Admins",
      icon: FcBusinessman,
    },
  ];

  const { info } = useSelector((state) => state.adminAuth);

  return (
    <div className="max-w-5xl w-full p-6 bg-slate-50 rounded shadow-lg shadow-black/30 mb-5">
      <nav className="m-auto bg-blue-200 rounded text-blue-800 border-x-4 border-blue-800">
        <ul className="flex justify-center flex-wrap gap-4 p-4 text-sm">
          {navTabs.map((tab, index) => (
            <li
              key={index}
              className={`flex justify-center items-center select-none cursor-pointer  hover:text-blue-700 hover:underline ${
                activeTab === tab.stateName
                  ? " font-bold underline underline-offset-2"
                  : " font-semibold"
              }
              ${
                info.role !== "owner" &&
                (index === 1 || index === 3) &&
                "hidden"
              }`}
              onClick={() => setActiveTab(tab.stateName)}
            >
              <tab.icon className="mr-1" size={25} />
              <span>{tab.tabName}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
