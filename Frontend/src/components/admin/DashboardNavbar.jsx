import React from "react";

export const DashboardNavbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white p-4 m-2 flex items-center border-2 border-blue-700">
      <nav className="m-auto bg-blue-700 rounded text-white">
        <ul className="flex justify-center flex-wrap gap-6 p-4">
          <li
            className={`font-semibold select-none cursor-pointer hover:text-black ${
              activeTab === "adminsList" && "text-black"
            }`}
            onClick={() => setActiveTab("adminsList")}
          >
            Admins Control Panel
          </li>

          <li
            className={`font-semibold select-none cursor-pointer hover:text-black ${
              activeTab === "usersRequests" && "text-black"
            }`}
            onClick={() => setActiveTab("usersRequests")}
          >
            Users Accounts Request
          </li>

          <li
            className={`font-semibold select-none cursor-pointer hover:text-black ${
              activeTab === "usersList" && "text-black"
            }`}
            onClick={() => setActiveTab("usersList")}
          >
            Users Control Panel
          </li>
        </ul>
      </nav>
    </div>
  );
};
