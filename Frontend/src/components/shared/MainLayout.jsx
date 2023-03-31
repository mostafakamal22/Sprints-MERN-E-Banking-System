import { Outlet } from "react-router-dom";
import { SideNavbar } from "./SideNavbar";
import { UseResetStatus } from "../../hooks/UseResetStatus";
import { resetUserStatus } from "../../state/features/User/UserData/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const MainLayout = () => {
  const info = useSelector((state) => state.userData.info);
  const dispatch = useDispatch();

  //clean up status (when mount and unmount)
  UseResetStatus(() => {
    dispatch(resetUserStatus());
  });

  UseResetStatus(() => {
    return () => {
      dispatch(resetUserStatus());
    };
  });

  return (
    <div className="min-h-screen  flex flex-no-wrap">
      {/* side navabr */}
      <SideNavbar user={info} />

      <div className="w-full h-full min-h-screen self-center flex justify-center items-center">
        <div className="w-full h-full min-h-screen flex justify-center items-center p-3 md:p-6 bg-slate-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
