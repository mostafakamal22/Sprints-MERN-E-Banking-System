import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAccountRequests,
  resetAccountRequestsStatus,
} from "../../state/features/Admin/AccountRequests/accountRequestsSlice";
import { resetAdminAuthStatus } from "../../state/features/Admin/Auth/adminAuthSlice";
import {
  getAllAdmins,
  resetOwnerStatus,
} from "../../state/features/Admin/Owener/ownerSlice";
import {
  getAllUsers,
  resetUsersStatus,
} from "../../state/features/Admin/UsersActions/usersSlice";
import { RegisterAdmin } from "../../components/forms/adminForms/RegisterAdmin";
import { SideNavbar } from "../../components/shared/SideNavbar";
import AdminListControl from "../../components/admin/AdminListControl";
import { DashboardNavbar } from "../../components/admin/DashboardNavbar";
import UsersAccountRequests from "../../components/admin/UsersAccountRequests";
import { UsersListControl } from "../../components/admin/UsersListControl";
import { UseResetStatus } from "../../hooks/UseResetStatus";
import { MainSpinner } from "../../components/shared/MainSpinner";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("usersList");
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.adminAuth);
  //Get (Users & Admins and AccountRequests) Lists
  useEffect(() => {
    //Get admins list only if owner logged in
    if (info.role === "owner") {
      dispatch(getAllAdmins({ token: info.token }));
    }

    //Get users
    dispatch(getAllUsers({ token: info.token }));

    //Get All Account Requests
    dispatch(getAllAccountRequests({ token: info.token }));
  }, [info]);

  //users list
  const { usersList } = useSelector((state) => state.usersData);

  //admins list
  const { adminsList } = useSelector((state) => state.ownerData);

  //Account Requests list
  const { accountRequestsList } = useSelector((state) => state.accountRequests);

  //clean up for admin status (on mount , unmount)
  UseResetStatus(() => {
    dispatch(resetAdminAuthStatus());
    dispatch(resetOwnerStatus());
    dispatch(resetUsersStatus());
    dispatch(resetAccountRequestsStatus());
  });

  UseResetStatus(() => {
    return () => {
      dispatch(resetAdminAuthStatus());
      dispatch(resetOwnerStatus());
      dispatch(resetUsersStatus());
      dispatch(resetAccountRequestsStatus());
    };
  });

  if (!usersList)
    return (
      <div className="mx-5 h-min-screen">
        <div className="max-w-5xl w-full h-full flex justify-center items-center mx-auto my-10 p-6 bg-slate-50 rounded shadow-lg shadow-black/30">
          <div className="flex justify-center items-center">
            <MainSpinner />
          </div>
        </div>
      </div>
    );

  if (usersList)
    return (
      <div className="min-h-screen  flex flex-nowrap">
        {/* admin dashboard side navabr */}
        <SideNavbar admin={info} />

        <div className="overflow-x-auto w-full h-full flex justify-center items-center">
          <div className="w-full flex justify-center items-center flex-col gap-6 p-10 md:px-20 md:py-10">
            {/* admin dashboard navabr */}
            <DashboardNavbar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Add New Admin panel */}
            {activeTab === "addAdmin" && <RegisterAdmin />}

            {/* admins control panel */}
            {activeTab === "adminsList" && (
              <AdminListControl adminsList={adminsList} />
            )}

            {/* users control panel */}
            {activeTab === "usersList" && (
              <UsersListControl usersList={usersList} />
            )}

            {/* users Account Request*/}
            {activeTab === "usersRequests" && (
              <UsersAccountRequests accountRequestsList={accountRequestsList} />
            )}
          </div>
        </div>
      </div>
    );
}
