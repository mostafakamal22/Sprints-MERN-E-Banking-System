import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateAdmin from "../../components/forms/adminForms/UpdateAdmin";
import { SideNavbar } from "../../components/shared/SideNavbar";
import { resetAccountRequestsStatus } from "../../state/features/Admin/AccountRequests/accountRequestsSlice";
import { resetAdminAuthStatus } from "../../state/features/Admin/Auth/adminAuthSlice";
import { resetOwnerStatus } from "../../state/features/Admin/Owener/ownerSlice";
import { resetUsersStatus } from "../../state/features/Admin/UsersActions/usersSlice";
import { UseResetStatus } from "../../hooks/UseResetStatus";

const UpdateAdminProfile = () => {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.adminAuth);

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

  return (
    <div className="min-h-screen flex flex-no-wrap ">
      {/* admin dashboard side navabr */}
      <SideNavbar admin={info} />

      <div className="w-full flex justify-center items-center ">
        <div className="w-full flex justify-center items-center p-10 md:px-20 md:py-10">
          <UpdateAdmin />
        </div>
      </div>
    </div>
  );
};

export default UpdateAdminProfile;
