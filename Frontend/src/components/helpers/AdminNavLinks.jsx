import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsFilePersonFill, BsGridFill } from "react-icons/bs";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import { adminsLogoutRequets } from "../../state/features/Admin/AccountRequests/accountRequestsSlice";
import { adminLogout } from "../../state/features/Admin/Auth/adminAuthSlice";
import { ownerLogout } from "../../state/features/Admin/Owner/ownerSlice";
import { adminsLogout } from "../../state/features/Admin/UsersActions/usersSlice";

export const AdminNavLinks = ({ admin }) => {
  const dispatch = useDispatch();

  //admin navbar Data
  const adminNavData = [
    {
      title: "Dashboard",
      icon: BsGridFill,
      to: "/",
    },
    {
      title: "Profile",
      icon: BsFilePersonFill,
      to: `/admins/profile/${admin.id}`,
    },
    {
      title: "Setting",
      icon: AiFillSetting,
      to: `/admins/profile/${admin.id}/update`,
    },
    {
      title: "Logout",
      icon: RiLogoutBoxRFill,
      handleLogout: () => {
        dispatch(adminsLogout());
        dispatch(ownerLogout());
        dispatch(adminLogout());
        dispatch(adminsLogoutRequets());
      },
    },
  ];

  return (
    <>
      {/* //Admin navbar links creation */}

      {adminNavData.map((link) => (
        <li
          key={link.title}
          className="flex w-full justify-between items-center mb-6 select-none"
        >
          {link.title === "Logout" ? (
            <button
              onClick={link.handleLogout}
              className="w-full flex items-center p-2 border-r-4 border-red-600 rounded shadow bg-red-200"
            >
              <link.icon className="text-red-800" size={23} />
              <span className="text-sm  ml-2 font-semibold text-red-800 hover:text-red-700 hover:underline">
                {link.title}
              </span>
            </button>
          ) : (
            <Link
              to={link.to}
              className="w-full flex items-center p-2 border-r-4 border-blue-800 rounded shadow bg-blue-200"
            >
              <link.icon className="text-blue-800" size={22} />
              <span
                className={`text-sm ml-2 text-blue-800 hover:text-blue-700 hover:underline ${
                  useMatch(link.to) ? "underline font-bold" : "font-semibold"
                }`}
              >
                {link.title}
              </span>
            </Link>
          )}
        </li>
      ))}
    </>
  );
};
