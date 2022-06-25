import React from "react";

export const DashboardNavbar = ({ setActiveTab }) => {
  return (
    <div>
      <nav>
        <ul>
          <li onClick={() => setActiveTab("adminsList")}>
            Admins Control Panel
          </li>
          <li onClick={() => setActiveTab("usersRequests")}>
            Users Accounts Request
          </li>
          <li onClick={() => setActiveTab("usersList")}>Users Control Panel</li>
        </ul>
      </nav>
    </div>
  );
};
