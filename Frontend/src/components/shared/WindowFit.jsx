import { useEffect, useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { SideNavbar } from "./SideNavbar";
import { useSelector } from "react-redux";

export const WindowFit = () => {
  const { info } = useSelector((state) => state.adminAuth);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (e) => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  let content = <Outlet />;

  if (windowWidth <= 800) {
    content = (
      <div className="min-h-screen flex flex-no-wrap">
        {/* admin dashboard side navabr */}
        <SideNavbar admin={info} />

        <div className="w-full h-full min-h-screen self-center flex justify-center items-center">
          <div className="w-full h-full min-h-screen flex justify-center items-center  bg-slate-50 ">
            <div className="flex justify-center items-center flex-col gap-4  w-full p-6 mx-2  bg-white rounded border">
              <FaMobileAlt size={64} className="text-blue-500" />

              <p className="text-lg font-semibold text-center text-red-500 bg-red-100 border border-red-200 rounded p-4 mb-6">
                For a better experience, please use a device with a minimum
                width of 800px.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return content;
};
