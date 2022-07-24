import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { BiCoinStack, BiMoney } from "react-icons/bi";
import { BsFilePersonFill, BsGridFill } from "react-icons/bs";
import { FaCoins, FaMoneyBillWaveAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdCircleNotifications, MdRequestPage } from "react-icons/md";
import {
  RiFundsBoxFill,
  RiLogoutBoxRFill,
  RiRefund2Line,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { resetAccountStatus } from "../../features/Account/AccountSlice";
import { logout, resetAuthStatus } from "../../features/Auth/authSlice";
import { resetUserStatus, userLogout } from "../../features/User/userSlice";

export const UserNavLinks = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account } = useSelector((state) => state.userAccount);

  //user navbar data
  const userNavData = [
    {
      title: "Home",
      icon: BsGridFill,
      to: "/",
    },
    {
      title: "Profile",
      icon: BsFilePersonFill,
      to: `/profile/${user.id}`,
    },
    {
      title: "Request Account",
      icon: MdRequestPage,
      to: `/account-request`,
    },
    {
      title: "Notifications",
      icon: MdCircleNotifications,
      to: `/notifications`,
    },
    {
      title: "Deposit",
      icon: FaCoins,
      to: account && `/account/deposit/${account._id}`,
    },
    {
      title: "Withdraw",
      icon: FaMoneyBillWaveAlt,
      to: account && `/account/withdraw/${account._id}`,
    },
    {
      title: "Transfer",
      icon: IoSend,
      to: account && `/account/transfer/${account._id}`,
    },
    {
      title: "OutGoing Balance",
      icon: RiFundsBoxFill,
      to: account && `/account/out/${account._id}`,
    },
    {
      title: "Incoming Balance",
      icon: RiRefund2Line,
      to: `/notifications`,
    },
    {
      title: "Deposit Logs",
      icon: BiCoinStack,
      to: `/account/deposit/:id`,
    },
    {
      title: "Withdraw Logs",
      icon: BiMoney,
      to: `/notifications`,
    },
    {
      title: "Setting",
      icon: AiFillSetting,
      to: `/profile/${user.id}/update`,
    },
    {
      title: "Logout",
      icon: RiLogoutBoxRFill,
      handleLogout: () => {
        navigate("/");
        dispatch(logout());
        dispatch(userLogout());
        dispatch(resetUserStatus());
        dispatch(resetAuthStatus());
        dispatch(resetAccountStatus());
      },
    },
  ];

  return (
    <>
      {/* //user navbar links creation */}

      {userNavData.map((link) => (
        <li
          key={link.title}
          className={`${
            user.accountsCount === 0 &&
            ![
              "Profile",
              "Setting",
              "Notifications",
              "Request Account",
              "Home",
              "Logout",
            ].includes(link.title) &&
            "hidden"
          } flex w-full justify-between items-center mb-6 select-none`}
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
              {link.title === "Notifications" &&
                user.notifications.filter(
                  (notification) => !notification.isSeen
                ).length > 0 && (
                  <div className="w-2 h-2 p-3 ml-auto  flex items-center justify-center bg-red-500 text-white font-bold text-xs rounded-full shadow">
                    {
                      user.notifications.filter(
                        (notification) => !notification.isSeen
                      ).length
                    }
                  </div>
                )}
            </Link>
          )}
        </li>
      ))}
    </>
  );
};
