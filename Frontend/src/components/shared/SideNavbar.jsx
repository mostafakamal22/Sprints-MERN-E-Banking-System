import React from "react";
import { BiMenu } from "react-icons/bi";
import { BsFilePersonFill, BsGridFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { AiFillHeart, AiFillSetting } from "react-icons/ai";
import { Link, useMatch } from "react-router-dom";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Logo } from "./Logo";
import { useDispatch } from "react-redux";
import { adminsLogout } from "../../features/Admin/UsersActions/usersSlice";
import { ownerLogout } from "../../features/Admin/Owener/ownerSlice";
import { adminLogout } from "../../features/Admin/Auth/adminAuthSlice";
import { adminsLogoutRequets } from "../../features/Admin/AccountRequests/accountRequestsSlice";

export const SideNavbar = ({ admin }) => {
  const dispatch = useDispatch();

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

  const adminNavLinks = adminNavData.map((link) => (
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
            className={`${
              useMatch(link.to) && "underline font-bold"
            } text-sm  ml-2 font-semibold text-blue-800 hover:text-blue-700 hover:underline`}
          >
            {link.title}
          </span>
        </Link>
      )}
    </li>
  ));

  //toggle sidebar
  const sidebarHandler = () => {
    //get navbar
    const sidebar = document.getElementById("mobile-nav");
    //get close btn
    const closeBtn = document.getElementById("closeSidebar");
    //get close btn
    const showBtn = document.getElementById("openSideBar");

    if (sidebar.classList.contains("translate-x-[-260px]")) {
      //show navbar
      sidebar.classList.replace("translate-x-[-260px]", "translate-x-0");
    } else {
      //hide navbar
      sidebar.classList.replace("translate-x-0", "translate-x-[-260px]");
    }

    //change btns
    closeBtn.classList.toggle("hidden");
    showBtn.classList.toggle("hidden");
  };

  return (
    <>
      {/* Sidebar starts */}

      {/* Tablet/desktop Sidebar*/}
      <div className="w-64 absolute sm:relative bg-slate-50 shadow-lg flex-col justify-between hidden md:flex ">
        <div className="px-8 py-8 sticky top-0">
          {/* Logo */}
          <Logo />

          {/* Welcome Message */}
          <div className="flex items-center p-2 my-4 bg-blue-200 text-sm font-bold text-blue-800 border-r-4 border-blue-800 rounded shadow">
            <AiFillHeart className="mr-1" size={22} />
            <span className="w-full">
              {`Welcome, `}
              {admin.name.split(" ")[0]}
            </span>
          </div>

          {/* Links */}
          <ul className="mt-12">
            {adminNavLinks}

            {/* <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">
                5
              </div> */}
          </ul>
        </div>
      </div>

      {/*Mobile Sidebar */}
      <div
        className="w-64 h-screen z-40 fixed bg-slate-50 shadow-lg md:h-full flex-col justify-between md:hidden  transition duration-150 ease-in-out translate-x-[-260px]"
        id="mobile-nav"
      >
        <div
          className="h-10 w-10 bg-slate-50 absolute right-0 mt-16 -mr-10 p-1 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer"
          id="mobile-toggler"
          onClick={sidebarHandler}
        >
          <BiMenu id="openSideBar" className="text-blue-800" size={40} />
          <TiDelete
            id="closeSidebar"
            className="hidden text-blue-800"
            size={40}
          />
        </div>
        <div className="px-8 py-8 sticky top-0">
          {/* Logo */}
          <Logo />

          {/* Welcome Message */}
          <div className="flex items-center p-2 my-4 bg-blue-200 text-sm font-bold text-blue-800 border-r-4 border-blue-800 rounded shadow">
            <AiFillHeart className="mr-1" size={22} />
            <span className="w-full">
              {`Welcome, `}
              {admin.name.split(" ")[0]}
            </span>
          </div>

          {/* Links */}
          <ul className="mt-12">
            {adminNavLinks}

            {/* <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">
      5
    </div> */}
          </ul>
        </div>
      </div>

      {/* Sidebar ends */}
    </>
  );
};
