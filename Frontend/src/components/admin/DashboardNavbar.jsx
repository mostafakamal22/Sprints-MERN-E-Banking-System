import React from "react";
import { useSelector } from "react-redux";

export const DashboardNavbar = ({ activeTab, setActiveTab }) => {
  const navTabs = ["usersList", "addAdmin", "adminsList", "usersRequests"];
  const tabsName = [
    "Users Control Panel",
    "Add New Admins",
    "Admins Control Panel",
    "Users Accounts Request",
  ];

  const { info } = useSelector((state) => state.adminAuth);

  return (
    <div className="bg-white p-4 m-2 flex items-center border-2 border-blue-700">
      <nav className="m-auto bg-blue-700 rounded text-white">
        <ul className="flex justify-center flex-wrap gap-6 p-4">
          {navTabs.map((tab, index) => (
            <li
              key={index}
              className={`font-semibold select-none cursor-pointer hover:text-black hover:underline ${
                activeTab === tab && "text-black"
              }
              ${
                info.role !== "owner" &&
                (index === 1 || index === 2) &&
                "hidden"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tabsName[index]}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
